
import { GameService, IGameService } from './gameService'

export interface IServerGameService extends IGameService {

}

export class ServerGameService extends GameService implements IServerGameService {

  constructor (args) {
    super(args)
  }

}
