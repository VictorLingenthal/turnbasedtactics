
import { Attack, Heal, Burn, IAbility } from './abilities'

export interface IUnitAbility {
  name: string
  damage: number
  ability: IAbility
  timeout: number
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
      damage: 10,
      timeout: 1,
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
      timeout: 2,
      ability: Heal
    }]
}

export const Witch:IUnitModel = {
    name: 'Healer',
    maxlife: 10,
    abilities: [{
      name: Burn.name,
      damage: 10,
      timeout: 3,
      targets: ['All_by_Enemy'],
      ability: Burn
    }]
}
