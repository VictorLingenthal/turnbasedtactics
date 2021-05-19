
import { Attack, Heal, Burn, IAbility } from './abilities'

export interface IUnitAbility {
  name: string
  damage: number
  ability: IAbility
  turnTimeout: number
  targets: string[],
}

export interface IUnitModel {
  name: string
  maxlife: number
  abilities: IUnitAbility[]
}

export class GameUnit implements IUnitModel {

  public name: string
  public maxlife: number
  public abilities: IUnitAbility[]

  constructor(data:IUnitModel) {
    this.name = data.name
    this.maxlife = data.maxlife
    this.abilities = data.abilities
  }

}

export const Knight:IUnitModel = {
    name: 'Knight',
    maxlife: 40,
    abilities: [{
      name: Attack.name,
      damage: 12,
      turnTimeout: 1,
      targets: ['Clicked'],
      ability: Attack
    }]
}

export const Healer:IUnitModel = {
    name: 'Healer',
    maxlife: 20,
    abilities: [{
      name: Heal.name,
      damage: 6,
      targets: ['All_by_Player'],
      turnTimeout: 3,
      ability: Heal
    }]
}

export const Witch:IUnitModel = {
    name: 'Witch',
    maxlife: 20,
    abilities: [{
      name: Burn.name,
      damage: 10,
      turnTimeout: 4,
      targets: ['All_by_Enemy'],
      ability: Burn
    }]
}
