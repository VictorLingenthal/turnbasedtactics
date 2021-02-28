
import { GameService, IGameService, UnitID } from './gameService'

import { ILiveUnit } from '../gamelogic/liveUnit'
import { IUnitAbility} from '../gamelogic/unitModels'

export class ServerGameService extends GameService implements IGameService {

  constructor () {
    super()
  }

  public applyAbility = (
    applyingUnit:ILiveUnit,
    unitAbility:IUnitAbility,
    recivingUnit:ILiveUnit,
    recivingUnits:ILiveUnit[]
  ):ILiveUnit[] => this.game.applyAbility(
    applyingUnit,
    unitAbility,
    recivingUnit,
    recivingUnits
  )

  public callApplyAbility = (
    applyingUnitID:UnitID,
    unitAbilityName:String,
    recivingUnitID:UnitID,
    recivingUnitIDs:UnitID[]
  ):Boolean => {
    const applyingUnit = this.getUnitbyUnitID(applyingUnitID)
    // console.log(applyingUnit)
    const unitAbility = applyingUnit.abilities.filter(ability => ability.name === unitAbilityName)[0]
    // console.log(unitAbility)
    const recivingUnit = this.getUnitbyUnitID(recivingUnitID)
    // console.log(recivingUnit)
    const recivingUnits = recivingUnitIDs.map(recivingUnitID => this.getUnitbyUnitID(recivingUnitID))
    // console.log(recivingUnits)

    this.applyAbility(
      applyingUnit,
      unitAbility,
      recivingUnit,
      recivingUnits
    )

    return false
  }

}
