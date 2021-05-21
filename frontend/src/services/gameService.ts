
import { Game, IGame } from '../gamelogic/game'
import { Player, IPlayer, IPlayerStub } from '../gamelogic/player'
import { ILiveUnit } from '../gamelogic/liveUnit'
import { IUnitAbility} from '../gamelogic/unitModels'

export type UnitID = [number:number,number:number]

export interface IGameServiceConstructor {
  gameID?: string
  players?: IPlayerStub
}

export interface IGameServiceObserver {
  endGame(winner:IPlayer):void
}

export interface IGameService {
  players: IPlayer[]
  game: IGame
  gameID:string
  checkCurrentPlayerByID(userID:string):Boolean
  dispatchAbility(
    applyingUnit:ILiveUnit,
    unitAbility:IUnitAbility,
    receivingUnit:ILiveUnit,
    receivingUnits:ILiveUnit[]
  ):void
  callApplyAbility(
    applyingUnitID:UnitID,
    unitAbilityName:string,
    receivingUnit:UnitID,
    receivingUnits:UnitID[]
  ):boolean
  createUnitID(unit:ILiveUnit):UnitID
  getUnitbyUnitID(unitID:UnitID):ILiveUnit
  endGame(winner:IPlayer):void
}

export class GameService implements IGameService {

  public players:IPlayer[]
  public game:IGame
  public gameID:string

  private gameServiceObserver:IGameServiceObserver

  constructor (args: {
    gameServiceObserver: IGameServiceObserver
    gameID: string
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

  public checkCurrentPlayerByID = (userID:string):Boolean =>
    userID === this.game.currentPlayer.userID

  public dispatchAbility = (
    applyingUnit:ILiveUnit,
    unitAbility:IUnitAbility,
    receivingUnit:ILiveUnit,
    receivingUnits:ILiveUnit[]
  ):void => {}

  public callApplyAbility = (
    applyingUnitID:UnitID,
    unitAbilityName:string,
    receivingUnitID:UnitID,
    receivingUnitIDs:UnitID[]
  ):boolean => {
    const applyingUnit = this.getUnitbyUnitID(applyingUnitID)
    const unitAbility = applyingUnit.abilities.filter(ability => ability.name === unitAbilityName)[0]
    const receivingUnit = this.getUnitbyUnitID(receivingUnitID)
    const receivingUnits = receivingUnitIDs.map(receivingUnitID => this.getUnitbyUnitID(receivingUnitID))

    return this.game.applyAbility(
      applyingUnit,
      unitAbility,
      receivingUnit,
      receivingUnits
    )
  }

  public createUnitID = (unit:ILiveUnit):UnitID =>
    [unit.player.id, unit.id]

  public getUnitbyUnitID = (unitID:UnitID):ILiveUnit =>
    this.game.units.filter(unit => unit.player.id == unitID[0] && unit.id == unitID[1])[0]

  public endGame = (winner:IPlayer):void =>
    this.gameServiceObserver?.endGame(winner)

}
