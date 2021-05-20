
import { IUnitAbility } from './unitModels'
import { ILiveUnit } from './liveUnit'

import { AbilityTargetsEnum } from '../model/abilityTargets.model'

export interface IAbility {
  name: string
  targets: AbilityTargetsEnum[]
  apply: Function
}


const apply = (applyingUnit:ILiveUnit, unitAbility:IUnitAbility, receivingUnits:ILiveUnit[]) => {
  applyingUnit.currentTurnTimeout = unitAbility.turnTimeout
  return receivingUnits.map(unit => ({
    ...unit,
    life: Math.min(unit.maxlife, unit.life - unitAbility.damage)
  }))
}

export const Attack:IAbility = {
    name: 'Attack',
    targets: [AbilityTargetsEnum.ENEMY],
    apply
}

export const Heal:IAbility = {
    name: 'Heal',
    targets: [AbilityTargetsEnum.ALLY],
    apply
}

export const Burn:IAbility = {
    name: 'Burn',
    targets: [AbilityTargetsEnum.ENEMY],
    apply
}
