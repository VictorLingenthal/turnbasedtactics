import { FC } from 'react'

import { IUnitAbility } from '../gamelogic/unitModels'
import { ILiveUnit } from '../gamelogic/liveUnit'
import { IGameService } from '../services/gameService'
import { UserService } from '../services/userService'
import { AbilityTargetsEnum } from '../model/abilityTargets.model'
import './scss/unit.scss'

export let Unit: FC<{
  unit:ILiveUnit
  gameService: IGameService
  selectedAbilty:[IUnitAbility|null,Function]
  selectedUnit:[ILiveUnit|null,Function]
}> = (props) => {

  const gameService = props.gameService

  const unit = props.unit
  const [selectedUnit, setSelectedUnit] = props.selectedUnit
  const [selectedAbilty, setSelectedAbilty] = props.selectedAbilty

  const executeAbility = () => {
    console.log('executeAbility')
    gameService.dispatchAbility(
      selectedUnit,
      selectedAbilty,
      unit,
      gameService.game.units.filter(u => u.player.name === unit.player.name)
    )
    setSelectedUnit(null)
    setSelectedAbilty(null)
  }

  return (
      <div
        className={"Unit" + (selectedUnit === unit ? " selectedUnit": "")}
        onClick={e => {
            //Check whose turn it is
            if (gameService.game.turn%2+1 === unit.player.id && UserService.getInstance().userID === unit.player.userID) {
              if (selectedAbilty && selectedAbilty.ability.targets[0] === AbilityTargetsEnum.ALLY) {
                executeAbility()
              } else {
                if (selectedUnit === null || unit.player.id === selectedUnit.player.id) {
                  if (unit.currentTurnTimeout > 0) {
                    console.log('This Unit is waiting')
                  } else {
                    setSelectedUnit((selectedUnit !== unit && unit.life > 0 ) ? unit : null)
                    setSelectedAbilty(null)
                  }
                } else console.log('no ability selected')
              }
            } else {
              if (selectedUnit) {
                if (selectedAbilty && selectedAbilty.ability.targets[0] === AbilityTargetsEnum.ENEMY) {
                  executeAbility()
                } else console.log("Can't apply to enemy")
              } else console.log("It's not your unit")
            }
          }
        }>
        <h4>{unit.name}</h4>
        {/*}<h4>unitID: {unit.id}</h4> */}
        <h6>{unit.life > 0 ? 'Alive' : 'Dead'}</h6>
        <h6>{unit.player.name}</h6>
        {/* }<h6>PlayerID: {unit.player.id}</h6> */}
        <div>Life: <span>{unit.life > 0? unit.life : 0}</span></div>
        { unit.currentTurnTimeout > 0 &&
          <div>Wait<span>{unit.currentTurnTimeout}</span>Turns</div>
        }

      </div>
  )
}
