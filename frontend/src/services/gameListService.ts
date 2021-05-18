
import { gql } from '@apollo/client';
import { apolloClient } from './apolloClient'

import { UserService } from './userService'
import { ClientGameService } from './clientgameService'
import { DisplayedGameService } from './displayedGameService'
import { routeStates } from '../model/routeStates.model'

export interface IPlayerStub {
  username: String
  userID: String
}

export interface IGameStub {
  gameName: String
  gameState: String
  gameID: String
  players: IPlayerStub[]
}

export interface IGameListService {
  activeGames: IGameStub[]
  getGameList(setGameList:Function, setRoute:Function):void
  openGame(): void
  joinGame(gameStub:IGameStub): void
}

export class GameListService implements IGameListService {

  private static instance: GameListService

  public activeGames:IGameStub[]
  private subscription
  private setGameList

  private constructor () {
    const demogame = {
      gameName: "Demogame",
      gameID: "DemoID - 1",
      gameState: 'Open',
      players: [{
        userID: "Test",
        username: "Testuser",
      }],
    }

    this.activeGames = [demogame]
    // this.subscription = null
  }

  public static getInstance():GameListService {
    if (!GameListService.instance)
      GameListService.instance = new GameListService()

    return GameListService.instance
  }

  public getGameList = (setGameList, setRoute) => {

    this.setGameList = setGameList

    if (!this.subscription) {
      this.getGameListQuery()
      console.log('getGameList - gameListSubscription')
      this.subscription = this.gameListSubscription(setRoute)
    }

  }

  private getGameListQuery = () =>
    apolloClient.query({
      query: gql`{
        getGameList {
          gameID
          gameName
          gameState
          players {
            userID
            username
          }
        }
      }`
    })
    .then(res => {
      const gameList = res.data.getGameList
      this.activeGames = gameList
      this.setGameList(gameList)
    })
    .catch(err => {
      console.log('getGameList - Error: ')
      console.log(err)
    })

  public openGame = () =>
    apolloClient.mutate({
      variables: {
        userID: UserService.getInstance().userID,
      },
      mutation: gql`
        mutation OpenGame(
          $userID: ID
        ){
          openGame(
            userID: $userID
          )
        }
      `,
    })
    .then(res => res)
    .catch(err => {
      console.log('openGame - Error:')
      console.log(err)
    })

  public joinGame = (gameStub) =>
    apolloClient.mutate({
      variables: {
        userID: UserService.getInstance().userID,
        gameID: gameStub.gameID,
      },
      mutation: gql`
        mutation JoinGame(
          $userID: ID
          $gameID: ID
        ){
          joinGame(
            userID: $userID
            gameID: $gameID
          )
        }
      `,
    })
    .then(res => res)
    .catch(err => {
      console.log('joinGame - Error:')
      console.log(err)
    })

  private gameListSubscription = (setRoute) => {
    const self = this
    return apolloClient.subscribe({
      variables: {
        userID: UserService.getInstance().userID
      },
      query: gql`
        subscription onNewGame {
          updateGameList {
            startNewGame
            gameName
            gameID
            gameState
            players {
              userID
              username
            }
          }
        }`,
    }).subscribe({
      next (obj) {

        console.log('gameListSubscription')
        const returnedGameData = obj.data.updateGameList
        console.log(returnedGameData)

        self.updateGameList(returnedGameData)

        if (
          returnedGameData.startNewGame &&
          returnedGameData.players.length === 2 &&
          returnedGameData.players.filter(player => player.userID === UserService.getInstance().userID).length != 0
        ) self.startGame(returnedGameData, setRoute)

      }
    })
  }

  private updateGameList = (returnedGameData) => {
    const filteredGames = this.activeGames.filter(game => game.gameID != returnedGameData.gameID)
    const newGameList = [...filteredGames, {
      gameID: returnedGameData.gameID,
      gameName: returnedGameData.gameName,
      gameState: returnedGameData.gameState,
      players: returnedGameData.players,
    }]

    this.activeGames = newGameList
    this.setGameList(newGameList)
  }

  private startGame = (game, setRoute) => {

    const newClientGameService = new ClientGameService({
      gameID: game.gameID,
      players: game.players
    })

    DisplayedGameService.getInstance().setDisplayedGameService(newClientGameService)

    setRoute(routeStates.GAME)
  }

}
