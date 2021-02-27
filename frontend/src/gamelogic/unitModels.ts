
import { Attack, Heal, IAbility } from './abilities'

export interface IUnitAbility {
  name: string
  damage: number
  ability: IAbility
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
    maxlife: 50,
    abilities: [{
      name: Attack.name,
      damage: 10,
      targets: ['Clicked'],
      ability: Attack
    }]
}

export const Healer:IUnitModel = {
    name: 'Healer',
    maxlife: 30,
    abilities: [{
      name: Heal.name,
      damage: 6,
      targets: ['All_by_Player'],
      ability: Heal
    }]
}
