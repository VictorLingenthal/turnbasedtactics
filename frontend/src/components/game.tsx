
import { FC, useState, useEffect, Dispatch, SetStateAction } from 'react'

import './scss/game.scss'

import { IUnitAbility } from '../gamelogic/unitModels'
import { Unit } from './unit'
import { DisplayedGameService } from '../services/displayedGameService'
import { routeStates } from '../model/routeStates.model'

export let Game: FC<{
  setRoute: Dispatch<SetStateAction<String>>
}> = (props) => {

  const gameService = DisplayedGameService.getInstance().getDisplayedGameService()
  const setRoute = props.setRoute

  const [rerender, setRerender] = useState(0)

  if (gameService) gameService.rerenderView = () => setRerender(rerender+1)
  useEffect(() => {},[rerender])

  const selectedUnitState = useState(null)
  const [selectedUnit, setSelectedUnit] = selectedUnitState

  const selectedAbilityState = useState<IUnitAbility|null>(null)
  const [selectedAbilty, setSelectedAbility] = selectedAbilityState

  if (gameService) return (
    <div className="Game">
      <div className="Timer">
        Timer: Todo
      </div>
      <div className="Turn">

        {gameService.game.winner &&
          <div>
            <span>The Game as Ended - The Winner is {gameService.game.winner.name}</span>
            <button onClick={(e) =>
              setRoute(routeStates.GAMELIST)
            }>Leave Game</button>
          </div>
        }

        <span>Turn: {gameService.game.turn}</span>
        {!gameService.game.winner && <span> - CurrentPlayer: {gameService.game.turn%2+1} {gameService.game.currentPlayer.name}</span>}

      </div>
      <div className="Battle">
        {
          gameService.game.units.filter(unit => unit.player.name == gameService.game.players[0].name).reverse().map((unit) =>
            <Unit
              key={unit.id}
              unit={unit}
              gameService={gameService}
              selectedAbilty={selectedAbilityState}
              selectedUnit={selectedUnitState}
            />
          )
        }
        <div className="Divider">vs</div>
        {
          gameService.game.units.filter(unit => unit.player.name == gameService.game.players[1].name).map((unit) =>
            <Unit
              key={unit.id}
              unit={unit}
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
            {
              ability.turnTimeout > 1 &&
              <span>Timeout: {ability.turnTimeout-1}</span>
            }
            </div>
          )
        }
      </div>
    </div>
  ); else return (<div>No Game started</div>)

}
