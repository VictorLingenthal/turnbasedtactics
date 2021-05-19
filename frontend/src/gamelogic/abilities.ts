
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
    apply: (applyingUnit:ILiveUnit, unitAbility:IUnitAbility, recivingUnits:ILiveUnit[]) => {
      applyingUnit.currentTurnTimeout = unitAbility.turnTimeout
      return recivingUnits.map(unit => ({
        ...unit,
        life: Math.min(unit.maxlife,unit.life-unitAbility.damage)
      })
    )
  }
}

export const Heal:IAbility = {
    name: 'Heal',
    targets: ['Ally'],
    apply: (applyingUnit:ILiveUnit, unitAbility:IUnitAbility, recivingUnits:ILiveUnit[]) => {
      console.log('unitAbility.turnTimeout')
      console.log(unitAbility.turnTimeout)
      applyingUnit.currentTurnTimeout = unitAbility.turnTimeout
      console.log('applyingUnit.currentTurnTimeout')
      console.log(applyingUnit.currentTurnTimeout)
      return recivingUnits.map(unit => ({
        ...unit,
        life: Math.min(unit.maxlife,unit.life+unitAbility.damage)
      })
    )}
}

export const Burn:IAbility = {
    name: 'Burn',
    targets: ['Enemy'],
    apply: (applyingUnit:ILiveUnit, unitAbility:IUnitAbility, recivingUnits:ILiveUnit[]) => {
      applyingUnit.currentTurnTimeout = unitAbility.turnTimeout
      return recivingUnits.map(unit => ({
        ...unit,
        life: Math.min(unit.maxlife,unit.life-unitAbility.damage)
      })
    )}
}
