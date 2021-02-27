
import { IUnitModel, Knight, Healer } from './unitModels'
import { ILiveUnit } from './liveUnit'

export interface IPlayer {
  name: string
  id: number
  unitModels: IUnitModel[]
  units: ILiveUnit[]
  alive: boolean
}

export class Player implements IPlayer {

  public name: string
  public id: number
  public unitModels: IUnitModel[]
  public units: ILiveUnit[]
  public alive: boolean

  constructor(playerSetup:IPlayer) {
    this.name = playerSetup.name
    this.id = playerSetup.id
    this.unitModels = playerSetup.unitModels
    this.units = []
    this.alive = true
  }

}

export class Player1 extends Player implements IPlayer {

  constructor() {
    super({
      name: "Player1",
      id: 1,
      unitModels: [Knight, Healer],
      units: [],
      alive: true
    })
  }

}

export class Player2 extends Player implements IPlayer{

  constructor() {
    super({
      name: "Player2",
      id: 2,
      unitModels: [Knight, Healer],
      units: [],
      alive: true
    })
  }

}
