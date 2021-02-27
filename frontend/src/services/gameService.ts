
import { Game, IGame } from '../gamelogic/game'
import { Player1, Player2, IPlayer } from '../gamelogic/player'
import { ILiveUnit } from '../gamelogic/liveUnit'
import { IUnitAbility} from '../gamelogic/unitModels'

export type UnitID = [number:number,number:number]

export interface IGameService {
  players: IPlayer[]
  game: IGame
  applyAbility(
    applyingUnit:ILiveUnit,
    unitAbility:IUnitAbility,
    recivingUnit:ILiveUnit,
    recivingUnits:ILiveUnit[]
  ):ILiveUnit[]
  callApplyAbility(
    applyingUnitID:UnitID,
    unitAbilityName:String,
    recivingUnit:UnitID,
    recivingUnits:UnitID[]
  ):Boolean
  createUnitID(unit:ILiveUnit):UnitID
  getUnitbyUnitID(unitID:UnitID):ILiveUnit
}

export class GameService implements IGameService {

  public players:IPlayer[]
  public game:IGame

  constructor () {

    this.players = [new Player1, new Player2]
    this.game = new Game({
      players: this.players
    })
  }

  public applyAbility = (
    applyingUnit:ILiveUnit,
    unitAbility:IUnitAbility,
    recivingUnit:ILiveUnit,
    recivingUnits:ILiveUnit[]
  ):ILiveUnit[] => recivingUnits

  public callApplyAbility = (
    applyingUnitID:UnitID,
    unitAbilityName:String,
    recivingUnit:UnitID,
    recivingUnits:UnitID[]
  ):Boolean => false

  public createUnitID = (unit:ILiveUnit):UnitID =>
    [unit.player.id, unit.id]

  public getUnitbyUnitID = (unitID:UnitID):ILiveUnit =>
    this.game.units.filter(unit => unit.player.id == unitID[0] && unit.id == unitID[1])[0]


}
