
import { IUnitModel, Knight, Witch, Healer } from './unitModels'
import { ILiveUnit } from './liveUnit'

export interface IPlayerStub {
  username: string
  userID: string
}

export interface IPlayer {
  name: string
  id: number
  userID: string
  unitModels?: IUnitModel[]
  units: ILiveUnit[]
  alive: boolean
}

export class Player implements IPlayer {

  public name: string
  public id: number
  public userID: string
  public unitModels: IUnitModel[]
  public units: ILiveUnit[]
  public alive: boolean

  constructor(playerSetup:IPlayerStub, id:number) {
    this.name = playerSetup.username
    this.id = id
    this.userID = playerSetup.userID
    this.unitModels = [Knight, Witch, Healer]
    // this.unitModels = [Knight]
    this.units = []
    this.alive = true
  }

}
