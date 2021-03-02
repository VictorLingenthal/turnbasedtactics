
import { GameService, IGameService, UnitID } from './gameService'

import { ILiveUnit } from '../gamelogic/liveUnit'
import { IUnitAbility} from '../gamelogic/unitModels'

export class ServerGameService extends GameService implements IGameService {

  constructor () {
    super()
  }

  // public applyAbility = (
  //   applyingUnit:ILiveUnit,
  //   unitAbility:IUnitAbility,
  //   recivingUnit:ILiveUnit,
  //   recivingUnits:ILiveUnit[]
  // ):ILiveUnit[] => this.game.applyAbility(
  //   applyingUnit,
  //   unitAbility,
  //   recivingUnit,
  //   recivingUnits
  // )

}
