
import { Game, IGame } from '../gamelogic/game'
import { Player1, Player2, IPlayer } from '../gamelogic/player'
import { ILiveUnit } from '../gamelogic/liveUnit'
import { IUnitAbility} from '../gamelogic/unitModels'

export type UnitID = [number:number,number:number]

export interface IGameService {
  players: IPlayer[]
  game: IGame
  dispatchAbility(
    applyingUnit:ILiveUnit,
    unitAbility:IUnitAbility,
    recivingUnit:ILiveUnit,
    recivingUnits:ILiveUnit[]
  ):void
  callApplyAbility(
    applyingUnitID:UnitID,
    unitAbilityName:String,
    recivingUnit:UnitID,
    recivingUnits:UnitID[]
  ):Boolean
  createUnitID(unit:ILiveUnit):UnitID
  getUnitbyUnitID(unitID:UnitID):ILiveUnit
  unitCountByPlayer():void
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

  public dispatchAbility = (
    applyingUnit:ILiveUnit,
    unitAbility:IUnitAbility,
    recivingUnit:ILiveUnit,
    recivingUnits:ILiveUnit[]
  ):void => {}

  public callApplyAbility = (
    applyingUnitID:UnitID,
    unitAbilityName:String,
    recivingUnitID:UnitID,
    recivingUnitIDs:UnitID[]
  ):Boolean => {
    console.log('callApplyAbility')
    const applyingUnit = this.getUnitbyUnitID(applyingUnitID)
    // console.log(applyingUnit)
    const unitAbility = applyingUnit.abilities.filter(ability => ability.name === unitAbilityName)[0]
    // console.log(unitAbility)
    const recivingUnit = this.getUnitbyUnitID(recivingUnitID)
    // console.log(recivingUnit)
    const recivingUnits = recivingUnitIDs.map(recivingUnitID => this.getUnitbyUnitID(recivingUnitID))
    // console.log(recivingUnits)

    this.game.applyAbility(
      applyingUnit,
      unitAbility,
      recivingUnit,
      recivingUnits
    )

    return false
  }

  public createUnitID = (unit:ILiveUnit):UnitID =>
    [unit.player.id, unit.id]

  public getUnitbyUnitID = (unitID:UnitID):ILiveUnit =>
    this.game.units.filter(unit => unit.player.id == unitID[0] && unit.id == unitID[1])[0]

  public unitCountByPlayer = ():void => {
    console.log('unitCountByPlayer')
    const unitCountByPlayer = this.players.map(player => ({
      player: player.name,
      unitCount: this.game.units.filter(unit => unit.player.name == player.name).length,
      unitlife: this.game.units.map(unit => unit.life)
    }))
    console.log(unitCountByPlayer)
    console.log('currentTurn: ' + this.game.turn)
  }

}
