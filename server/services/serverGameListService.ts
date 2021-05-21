
import { IActiveUser } from './userService'
import { ActiveGame, IActiveGame, IGameData } from './activeGame'
import { UserService } from './../services/userService'
import { GameStateEnum } from '../../frontend/src/model/gameStates.model'

import { v4 as uuidv4 } from 'uuid'

export interface IServerGameListService {
  activeGames:IActiveGame[]
  getGameList():IGameData[]
  getGameByID(id:string):IActiveGame
  startGame(user:IActiveUser):IActiveGame
  joinGame(id:string, user:string):IActiveGame|null
}

export class ServerGameListService implements IServerGameListService {

  private static instance:ServerGameListService
  public activeGames:IActiveGame[]

  private constructor() {
    this.activeGames = []
  }

  public static getInstance():ServerGameListService {
    if (!ServerGameListService.instance)
      ServerGameListService.instance = new ServerGameListService()

    return ServerGameListService.instance
  }

  public getGameList = () => this.activeGames

  public getGameByID = (id:string) => {
    return this.activeGames.filter(
      game => game.gameID === id
    )[0]
  }

  public startGame = (user:IActiveUser):ActiveGame => {

    const newgame = new ActiveGame(user, uuidv4())
    this.activeGames = [...this.activeGames,newgame]

    return newgame
  }

  public joinGame = (gameID:string, userID:string) => {

    const userService = UserService.getInstance()
    const user = userService.findUserByUserID(userID)
    const activeGame = this.getGameByID(gameID)

    if (activeGame.gameState === GameStateEnum.OPEN) {
      return activeGame.join(user)
    } else
      return null

  }

}
