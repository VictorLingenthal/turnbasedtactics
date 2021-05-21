
// import { RedisPubSub } from 'graphql-redis-subscriptions';
// const pubSub = new RedisPubSub();
import { pubSub } from '../../frontend/src/services/redisclient'

import { IActiveUser } from './userService'

import { ServerGameService, IServerGameService } from '../../frontend/src/services/serverGameService'
import { IPlayer } from '../../frontend/src/gamelogic/player'
import { GameStateEnum } from '../../frontend/src/model/gameStates.model'

export interface IGameData {
  gameID:string
  gameName:string
  playerNames?:string[]
  gameState:GameStateEnum
}

export interface IActiveGame extends IGameData {
  players:IActiveUser[]
  getGameData():IGameData
  join(user:IActiveUser):IActiveGame|null
  gameService:IServerGameService|null
  endGame(winner:IPlayer):void
  publish_update(startNewGame?:boolean):void
}

export class ActiveGame implements IActiveGame {

  public gameID:string
  public gameName:string
  public players:IActiveUser[]
  public gameState:GameStateEnum
  public gameService:IServerGameService|null

  constructor(initialUser:IActiveUser, gameID:string) {
    this.gameID = gameID
    this.gameName = initialUser.username
    this.players = [initialUser]
    this.gameState = GameStateEnum.OPEN
    this.gameService = null
  }

  public getGameData = () => ({
    gameID: this.gameID,
    gameName: this.gameName,
    playerNames: this.players.map(player => player.username),
    gameState: this.gameState
  })

  public join = (user:IActiveUser):IActiveGame|null => {
    if (
      this.players.length === 1 &&
      this.gameState === GameStateEnum.OPEN &&
      this.players.filter(player => player.userID === user.userID).length === 0
    ) {
      this.players.push(user)
      this.gameState = GameStateEnum.STARTED

      this.gameService = new ServerGameService({
        gameID: this.gameID,
        players: this.players,
        gameServiceObserver: this,
      })

      return this
    } else return null
  }

  public endGame = (winner:IPlayer) => {
    this.gameState = GameStateEnum.FINISHED
    this.publish_update()
  }

  public publish_update = (startNewGame?:boolean) =>
    pubSub.publish('UPDATE_GAMELIST', {
      updateGameList: {
        startNewGame: startNewGame ? startNewGame : false,
        gameName: this.gameName,
        gameID: this.gameID,
        gameState: this.gameState,
        players: this.players,
      }
    })

}
