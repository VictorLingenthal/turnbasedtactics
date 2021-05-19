
import { Game, IGame } from '../gamelogic/game'
import { Player, IPlayer, IPlayerStub } from '../gamelogic/player'
import { ILiveUnit } from '../gamelogic/liveUnit'
import { IUnitAbility} from '../gamelogic/unitModels'

export type UnitID = [number:number,number:number]

export interface IGameServiceConstructor {
  gameID?: String
  players?: IPlayerStub
}

interface IGameServiceObserver {
  endGame(winner:IPlayer):void
}

export interface IGameService {
  players: IPlayer[]
  game: IGame
  gameID:String
  checkCurrentPlayerByID(userID:String):Boolean
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
  endGame(winner:IPlayer):void
}

export class GameService implements IGameService {

  public players:IPlayer[]
  public game:IGame
  public gameID:String

  private gameServiceObserver:IGameServiceObserver

  constructor (args: {
    gameServiceObserver: IGameServiceObserver
    gameID: String
    players: IPlayerStub[]
  }) {

    this.players = []
    this.initPlayers(args)
    this.gameServiceObserver = args.gameServiceObserver

    this.gameID = args?.gameID || '0'
    this.game = new Game({
      gameService: this,
      players: this.players,
    })
  }

    private initPlayers = (args: { players: any[] }) => {

      args?.players?.map((playerstub, idx) => this.players[idx] = new Player(playerstub, idx+1))

    }

  public checkCurrentPlayerByID = (userID:String):Boolean =>
    userID === this.game.currentPlayer.userID

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
    const applyingUnit = this.getUnitbyUnitID(applyingUnitID)
    const unitAbility = applyingUnit.abilities.filter(ability => ability.name === unitAbilityName)[0]
    const recivingUnit = this.getUnitbyUnitID(recivingUnitID)
    const recivingUnits = recivingUnitIDs.map(recivingUnitID => this.getUnitbyUnitID(recivingUnitID))

    if (
      applyingUnit.life > 0 &&
      applyingUnit.currentTurnTimeout < 1
    )
      return this.game.applyAbility(
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

  public endGame = (winner:IPlayer):void =>
    this.gameServiceObserver?.endGame(winner)

}
