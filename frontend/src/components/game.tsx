
import { FC, useState, useEffect, Dispatch, SetStateAction } from 'react'

import './scss/game.scss'

import { IUnitAbility } from '../gamelogic/unitModels'
import Unit from './unit'
import { DisplayedGameService } from '../services/displayedGameService'
import { routeStates } from '../model/routeStates.model'

export let Game: FC<{
  setRoute: Dispatch<SetStateAction<String>>
}> = (props) => {

  const gameService = DisplayedGameService.getInstance().getDisplayedGameService()
  const setRoute = props.setRoute

  const [units, setUnits] = useState(gameService.game?.units);
  const turnState = useState(gameService.game.turn)
  const [turn, setTurn] = turnState
  const [winner, setWinner] = useState<String>(null)

  gameService.incTurn = () => setTurn(turn+1)

  useEffect(() => {
    if (turn != gameService.game.turn && gameService.game.winner) {
      setTurn(turn-1)
      setWinner(gameService.game.winner.name)
    }
    setUnits(gameService.game.units)
  },[turn])

  const selectedUnitState = useState(null)
  const [selectedUnit, setSelectedUnit] = selectedUnitState

  const selectedAbilityState = useState<IUnitAbility|null>(null)
  const [selectedAbilty, setSelectedAbility] = selectedAbilityState

  return (
    <div className="Game">
      <div className="Timer">
        Timer
        <span>GameID: {gameService.gameID} - </span>
      </div>
      <div className="Turn">

        {winner &&
          <div>
            <span>The Game as Ended - The Winner is {winner}</span>
            <button onClick={(e) =>
              setRoute(routeStates.GAMELIST)
            }>Leave Game</button>
          </div>
        }

        <span>Turn: {turn}</span>
        {!winner && <span> - CurrentPlayer: {turn%2+1} {gameService.game.currentPlayer.name}</span>}

      </div>
      <div className="Battle">
        {
          units.filter(unit => unit.player.name == gameService.game.players[0].name).map((unit) =>
            <Unit
              key={unit.id}
              unit={unit}
              turn={turnState}
              gameService={gameService}
              selectedAbilty={selectedAbilityState}
              selectedUnit={selectedUnitState}
            />
          )
        }
        <div className="Divider">vs</div>
        {
          units.filter(unit => unit.player.name == gameService.game.players[1].name).map((unit) =>
            <Unit
              key={unit.id}
              unit={unit}
              turn={turnState}
              gameService={gameService}
              selectedAbilty={selectedAbilityState}
              selectedUnit={selectedUnitState}
            />
          )
        }

      </div>

      <div className="Controls">
        {
          selectedUnit?.abilities.map((ability:IUnitAbility) =>
            <div className={"Control" + (selectedAbilty === ability ? ' selected' : '')}
              onClick={e => {
                setSelectedAbility(ability)
              }}
            >
            <span>{ability.ability.name}: {ability.damage}</span>
            </div>
          )
        }
      </div>
    </div>
  )
}
