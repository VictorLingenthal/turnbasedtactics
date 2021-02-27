import React, { FC, useState } from 'react'

import { IPlayer } from '../gamelogic/player'
import { IUnitAbility } from '../gamelogic/unitModels'
import { ILiveUnit } from '../gamelogic/liveUnit'

import './scss/unit.scss'

let Unit: FC<{
  unit:ILiveUnit
  turn:[number,Function]
  dispatchMyAbility: Function
  dispatchEnemyAbility: Function
  selectedAbilty:[IUnitAbility|null,Function]
  selectedUnit:[ILiveUnit|null,Function]
}> = (props) => {

  const unit = props.unit
  const [selectedUnit, setSelectedUnit] = props.selectedUnit
  const [selectedAbilty, setSelectedAbilty] = props.selectedAbilty
  const [turn, setTurn] = props.turn

  const executeAbility = () => {
    if (props.unit.player.id === 1)
      props.dispatchMyAbility({
        type: 'apply',
        applyingUnit: selectedUnit,
        selectedAbilty: selectedAbilty,
        receivingUnit: unit
      })
    if (props.unit.player.id === 2)
      props.dispatchEnemyAbility({
        type: 'apply',
        applyingUnit: selectedUnit,
        selectedAbilty: selectedAbilty,
        receivingUnit: unit
      })
    setSelectedUnit(null)
    setSelectedAbilty(null)
    setTurn(turn+1)
  }

  return (
      <div
        className={"Unit" + (selectedUnit === unit ? " selectedUnit": "")}
        onClick={e => {
            //Check whose turn it is
            if (turn%2+1 === props.unit.player.id) {
              if (selectedAbilty && selectedAbilty.ability.targets[0] === 'Ally') {
                executeAbility()
              } else {
                if (selectedUnit === null || props.unit.player.id === selectedUnit.player.id) {
                  setSelectedUnit(selectedUnit === unit ? null : unit)
                  setSelectedAbilty(null)
                }
                else console.log('no ability selected')
              }
            } else {
              if (selectedUnit) {
                if (selectedAbilty && selectedAbilty.ability.targets[0] === 'Enemy') {
                  executeAbility()
                } else console.log("Can't apply to enemy")
              } else console.log("It's not your unit")
            }
          }
        }>
        <h4>{unit.name}</h4>
        <h6>{unit.life > 0 ? 'Alive' : 'Dead'}</h6>
        <h6>{props.unit.player.name}</h6>
        <div>Life: <span>{unit.life > 0? unit.life : 0}</span></div>

      </div>
  )
}


export default Unit
