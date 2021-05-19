
import { IUnitModel, IUnitAbility } from './unitModels'
import { IPlayer } from './player'


export interface ILiveUnit {
  id:number
  player:IPlayer

  name: string
  maxlife: number
  currentTurnTimeout: number
  life: number
  abilities: IUnitAbility[]
}

export class GameUnit implements ILiveUnit {

  public id: number
  public player: IPlayer

  public name: string
  public maxlife: number
  public currentTurnTimeout: number
  public life: number
  public abilities: IUnitAbility[]

  constructor(id:number, player:IPlayer, unitModel:IUnitModel) {
    this.id = id
    this.player = player
    console.log('Live unit')

    this.name = unitModel.name
    this.life = unitModel.maxlife
    this.currentTurnTimeout = 0
    this.maxlife = unitModel.maxlife
    this.abilities = unitModel.abilities
  }

}
