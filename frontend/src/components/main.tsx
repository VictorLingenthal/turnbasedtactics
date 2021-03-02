import React, { FC, useState, useReducer, useEffect } from 'react'

import './scss/main.scss'

import { apolloClient } from '../services/apolloClient'
import { UnitService } from '../services/unitService'
import { IUnitAbility } from '../gamelogic/unitModels'
import { ILiveUnit } from '../gamelogic/liveUnit'
import Unit from './unit'

import { ClientGameService } from '../services/clientgameService'

console.log('New Game Loading')
const gameService = new ClientGameService(apolloClient)

let Menu: FC<{

}> = (props) => {

  useEffect(() => {
    let unitservice = new UnitService(apolloClient)
    unitservice.getUnits((unit:ILiveUnit) => console.log(unit))
  },[])

  const [units, setUnits] = useState(gameService.game?.units);
  const turnState = useState(gameService.game.turn)
  const [turn, setTurn] = turnState

  const incTurn = () => {
    console.log('IncTurn!')
    setTurn(turn+1)
  }
  gameService.incTurn = incTurn

  useEffect(() => {
    // console.log('Turn changed')
    if (turn != gameService.game.turn)
      console.error('There was a problem with the turn system')
    // setTurn(gameService.game.turn)
    setUnits(gameService.game.units)
  },[turn])

  const selectedUnitState = useState(null)
  const [selectedUnit, setSelectedUnit] = selectedUnitState

  const selectedAbilityState = useState<IUnitAbility|null>(null)
  const [selectedAbilty, setSelectedAbility] = selectedAbilityState

  return (
    <div className="Main">
      <div className="Timer">Timer</div>
      <div className="Turn">Turn: {turn} - CurrentPlayer: {turn%2}</div>
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


export default Menu
