
import { GameService, IGameService } from './gameService'
import { IGameServiceObserver } from './gameService'
import { IPlayerStub } from '../gamelogic/player'


export interface IServerGameService extends IGameService {

}

export class ServerGameService extends GameService implements IServerGameService {

  constructor (args: {
    gameServiceObserver: IGameServiceObserver
    gameID: string
    players: IPlayerStub[]
  }) {
    super(args)
  }

}
