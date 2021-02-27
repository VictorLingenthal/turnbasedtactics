
import { IUnitAbility } from './unitModels'
import { ILiveUnit } from './liveUnit'

export interface IAbility {
  name: string
  targets: string[]
  apply: Function
}

export const Attack:IAbility = {
    name: 'Attack',
    targets: ['Enemy'],
    apply: (applyingUnit:ILiveUnit, unitAbility:IUnitAbility, recivingUnits:ILiveUnit[]) => (
      recivingUnits.map(unit => ({
        ...unit,
        life: Math.min(unit.maxlife,unit.life-unitAbility.damage)
      })
    ))
}

export const Heal:IAbility = {
    name: 'Heal',
    targets: ['Ally'],
    apply: (applyingUnit:ILiveUnit, unitAbility:IUnitAbility, recivingUnits:ILiveUnit[]) => (
      recivingUnits.map(unit => ({
        ...unit,
        life: Math.min(unit.maxlife,unit.life+unitAbility.damage)
      })
    ))
}
