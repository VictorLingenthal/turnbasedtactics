import React, { FC, useState, useReducer, useEffect } from 'react'

import './scss/main.scss'

import { apolloClient } from '../services/apolloClient'
import { UnitService } from '../services/unitService'
import { IUnitAbility } from '../gamelogic/unitModels'
import { ILiveUnit } from '../gamelogic/liveUnit'
import Unit from './unit'

import { ClientGameService } from '../services/clientGameService'

console.log('New Game Loading')

const gameservice = new ClientGameService(apolloClient)

function receiveAbility(recivingUnits:ILiveUnit[], action:any):ILiveUnit[] {
  switch (action.type) {
    case 'apply' : {
      return gameservice.applyAbility(action.applyingUnit, action.selectedAbilty, action.receivingUnit, recivingUnits)
    }
    default: {
      return recivingUnits
    }
  }
}


let Menu: FC<{

}> = (props) => {

  useEffect(() => {
    let unitservice = new UnitService(apolloClient)
    unitservice.getUnits((unit:ILiveUnit) => console.log(unit))
  },[])

  const [myunits, dispatchMyAbilities] = useReducer(receiveAbility, gameservice.game?.getUnitsByPlayer(gameservice.game.players[0]));
  const [enemyunits, dispatchEnemyAbilities] = useReducer(receiveAbility, gameservice.game?.getUnitsByPlayer(gameservice.game.players[1]));
  const turnState = useState(1)
  const [turn, setTurn] = turnState

  useEffect(() => {
    console.log('Update Turn')
    setTurn(gameservice.game.turn)
  },[gameservice])

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
          myunits.map((unit) =>
            <Unit
              key={unit.id}
              unit={unit}
              turn={turnState}
              dispatchMyAbility={dispatchMyAbilities}
              dispatchEnemyAbility={dispatchEnemyAbilities}
              selectedAbilty={selectedAbilityState}
              selectedUnit={selectedUnitState}
            />
          )
        }
        <div className="Divider">vs</div>
        {
          enemyunits.map((unit) =>
            <Unit
              key={unit.id}
              unit={unit}
              turn={turnState}
              dispatchMyAbility={dispatchMyAbilities}
              dispatchEnemyAbility={dispatchEnemyAbilities}
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
