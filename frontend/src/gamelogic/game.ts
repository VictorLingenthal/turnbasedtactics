
import { IUnitAbility } from './unitModels'
import { IPlayer } from './player'
import { GameUnit, ILiveUnit } from './liveUnit'
import { IGameService } from '../services/gameService'

interface IGameObserver {
  endGame(player:IPlayer):void
}

export interface IGameState {
  gameService: IGameService
  players: IPlayer[]
  turn?: number
  currentPlayer?: IPlayer
  units?: ILiveUnit[]
}

export interface IGame {
  players: IPlayer[]
  remaining_players: IPlayer[]
  winner: IPlayer
  turn: number
  currentPlayer: IPlayer
  units: ILiveUnit[]

  getWinner():IPlayer

  getUnitsByPlayer(player:IPlayer):ILiveUnit[]
  applyAbility(applyingUnit:ILiveUnit, unitability:IUnitAbility, receivingUnit:ILiveUnit, receivingUnits:ILiveUnit[]):boolean
}

export class Game implements IGame {

  private gameService:IGameObserver

  public players: IPlayer[]
  public remaining_players: IPlayer[]
  public currentPlayer: IPlayer
  public winner: IPlayer
  public turn: number
  public units: ILiveUnit[]


  constructor(args:IGameState) {
    this.gameService = args.gameService
    this.players = args.players
    this.remaining_players = this.players
    this.turn = args.turn || 0
    this.currentPlayer = args.currentPlayer || args.players[0]
    this.units = []

    this.initializeGame()
  }

  private initializeGame = ():ILiveUnit[][] =>
    this.players.map(player => player.units = this.initializeUnits(player))

  private initializeUnits = (player:IPlayer):ILiveUnit[] => {
    const playerUnits = player.unitModels.map((unitModel, idx) => new GameUnit(idx, player, unitModel))
    this.units = [...this.units, ...playerUnits]
    return playerUnits
  }

  private insertUnits = (units:ILiveUnit[]):void => {
    for (var i in units)
      this.units = this.units.map(unit => (units[i].id === unit.id && units[i].player.id === unit.player.id) ? units[i] : unit)
  }

  private filterDeadUnits = (units:ILiveUnit[]):ILiveUnit[] =>
    units.filter(unit => unit.life != 0)

  public applyAbility = (applyingUnit:ILiveUnit, unitAbility:IUnitAbility, receivingUnit:ILiveUnit, receivingUnits:ILiveUnit[]):boolean => {
    if (
      applyingUnit.currentTurnTimeout > 0 ||
      applyingUnit.life < 1
    ) return false

    switch (unitAbility.targets[0]) {
      case 'Clicked' : {
        const updatedUnits = unitAbility.ability.apply(applyingUnit, unitAbility, this.filterDeadUnits([receivingUnit]))
        this.insertUnits(updatedUnits)
        this.changeTurn()
        return true
      }
      case 'All_by_Player' : {
        const updatedUnits = unitAbility.ability.apply(applyingUnit, unitAbility, this.filterDeadUnits(receivingUnits))
        this.insertUnits(updatedUnits)
        this.changeTurn()
        return true
      }
      case 'All_by_Enemy' : {
        const updatedUnits = unitAbility.ability.apply(applyingUnit, unitAbility, this.filterDeadUnits(receivingUnits))
        this.insertUnits(updatedUnits)
        this.changeTurn()
        return true
      }
      default: {
        this.changeTurn()
        return true
      }

    }
  }

  public getUnitsByPlayer = (player:IPlayer):ILiveUnit[] =>
    this.units.filter(unit => unit.player === player)

  private changeTurn = () => {
    if (this.checkForWinner()) {
      this.gameService?.endGame(this.winner)
    } else {
      this.changeTurnTimeouts()
      this.switchToNextPlayer()
      this.turn++
    }
  }

  private changeTurnTimeouts = () =>
    this.getUnitsByPlayer(this.currentPlayer).map(unit =>
      unit.currentTurnTimeout > 0 ? unit.currentTurnTimeout-- : unit)

  private switchToNextPlayer = () => {
    const players_left = this.players.length
    const idxCurrentPlayerInc = this.players.indexOf(this.currentPlayer)+1
    const idxNextPlayer = players_left === idxCurrentPlayerInc ? 0 : idxCurrentPlayerInc

    this.currentPlayer = this.players[idxNextPlayer]
  }

  private checkForWinner = ():Boolean => {

    const players_to_remove:IPlayer[] = []

    for (var i in this.remaining_players) {

      const remainingUnits = this.units.filter(unit =>
         unit.life > 0 &&
         unit.player.id === this.remaining_players[i].id
      ).length

      if (remainingUnits === 0)
        players_to_remove.push(this.remaining_players[i])

    }

    for (var i in players_to_remove)
      this.remaining_players = this.remaining_players.filter(player => player.name != players_to_remove[i].name)

    if (this.remaining_players.length === 1) {
      this.winner = this.remaining_players[0]
      return true
    }

    return false
  }

  public getWinner = ():IPlayer => this.winner


}
