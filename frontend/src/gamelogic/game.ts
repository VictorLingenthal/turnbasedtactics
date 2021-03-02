
import { IUnitModel, IUnitAbility, Knight, Healer } from './unitModels'
import { IPlayer } from './player'
import { GameUnit, ILiveUnit } from './liveUnit'


export interface IGameState {
  players: IPlayer[]
  turn?: number
  currentPlayer?: IPlayer
  units?: ILiveUnit[]
}

export interface IGame {
  players: IPlayer[]
  turn: number
  currentPlayer: IPlayer
  units: ILiveUnit[]

  getUnitsByPlayer(player:IPlayer):ILiveUnit[]
  applyAbility(applyingUnit:ILiveUnit, unitability:IUnitAbility, recivingUnit:ILiveUnit, recivingUnits:ILiveUnit[]):void
}

export class Game implements IGame {

  public players: IPlayer[]
  public currentPlayer: IPlayer
  public turn: number
  public units: ILiveUnit[]

  constructor(args:IGameState) {
    this.players = args.players
    this.turn = args.turn || 0
    this.currentPlayer = args.currentPlayer || args.players[0]
    this.units = []

    this.initializePlayers()
  }

  private initializePlayers = ():ILiveUnit[][] =>
    this.players.map(player => player.units = this.initializeUnits(player))

  private initializeUnits = (player:IPlayer):ILiveUnit[] => {
    const playerUnits = player.unitModels.map((unitModel, idx) => new GameUnit(idx, player, unitModel))
    this.units = [...this.units, ...playerUnits]
    return playerUnits
  }

  private insertUnits = (units:ILiveUnit[]):void => {
    for (let i = 0; i < units.length; i++) {
      let updatedUnit = units[i]
      this.units = this.units.map(unit => (updatedUnit.id === unit.id && updatedUnit.player.id === unit.player.id) ? updatedUnit : unit)
    }
  }

  public applyAbility = (applyingUnit:ILiveUnit, unitAbility:IUnitAbility, recivingUnit:ILiveUnit, recivingUnits:ILiveUnit[]):void => {

    switch (unitAbility.targets[0]) {
      case 'Clicked' : {
        const updatedUnits = unitAbility.ability.apply(applyingUnit, unitAbility, [recivingUnit])
        this.insertUnits(updatedUnits)
        this.changeTurn()
        return
      }
      case 'All_by_Player' : {
        const updatedUnits = unitAbility.ability.apply(applyingUnit, unitAbility, recivingUnits)
        this.insertUnits(updatedUnits)
        this.changeTurn()
        return
      }
      default: {
        this.changeTurn()
        return
      }

    }
  }

  public getUnitsByPlayer = (player:IPlayer):ILiveUnit[] =>
    this.units.filter(unit => unit.player === player)

  private changeTurn = () => {
    if (this.checkForWinner()) {
      console.log('TBD: proclaim winner')
    } else {
      this.switchToNextPlayer()
      this.turn++
    }
  }

  private switchToNextPlayer = () => {
    const players_left = this.players.length
    const idxCurrentPlayerInc = this.players.indexOf(this.currentPlayer)+1
    const idxNextPlayer = players_left === idxCurrentPlayerInc ? 0 : idxCurrentPlayerInc

    this.currentPlayer = this.players[idxNextPlayer]
  }

  private checkForWinner = () => {
    console.log('TBD: are there losers?')
    return false
  }

}
