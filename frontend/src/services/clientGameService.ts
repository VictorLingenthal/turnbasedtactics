
import { GameService, IGameService, UnitID } from './gameService'
import{ UserService } from './userService'

import { gql } from '@apollo/client';
import { apolloClient } from './apolloClient'

import { ILiveUnit } from '../gamelogic/liveUnit'
import { IUnitAbility} from '../gamelogic/unitModels'

export interface IClientGameService extends IGameService {
  incTurn: Function
}

export class ClientGameService extends GameService implements IClientGameService {

  public incTurn: Function

  constructor (args) {
    super(args)
    this.setUpSubscription()
    this.incTurn = () => {console.log('incTurn() not Set')}
  }

  public dispatchAbility = (applyingUnit:ILiveUnit, unitAbility:IUnitAbility, recivingUnit:ILiveUnit, recivingUnits:ILiveUnit[]):void => {
    console.log('this.gameID')
    console.log(this.gameID)
    apolloClient.mutate({
      variables: {
        gameID: this.gameID,
        userID: UserService.getInstance().userID,
        applyingUnitID: this.createUnitID(applyingUnit),
        unitAbilityName: unitAbility.ability.name,
        recivingUnitID: this.createUnitID(recivingUnit),
        recivingUnitIDs: recivingUnits.map(unit => this.createUnitID(unit))
      },
      mutation: gql`
        mutation ApplyAbility(
          $gameID: ID,
          $userID: ID,
          $applyingUnitID: [ID],
          $unitAbilityName: String,
          $recivingUnitID: [ID],
          $recivingUnitIDs: [[ID]]
        ) {
          applyAbility(
            gameID: $gameID,
            userID: $userID,
            applyingUnitID: $applyingUnitID,
            unitAbilityName: $unitAbilityName,
            recivingUnitID: $recivingUnitID,
            recivingUnitIDs: $recivingUnitIDs
          )
        }
      `
    })
    // TBD Later
    // .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  private setUpSubscription = () => {
    const self = this
    console.log('clientgameService - setUpSubscription')
    console.log(this.gameID)
    apolloClient.subscribe({
      variables: {
        gameID: this.gameID
      },
      query: gql`
        subscription sendTurn ($gameID: ID) {
          sendTurn (gameID: $gameID) {
            applyingUnitID
            unitAbilityName
            recivingUnitID
            recivingUnitIDs
          }
        }
        `,
    }).subscribe({
      next (obj) {
        const args = obj.data.sendTurn
        console.log('clientgameService')
        console.log(args)
        self.callApplyAbility(
          args.applyingUnitID,
          args.unitAbilityName,
          args.recivingUnitID,
          args.recivingUnitIDs
        )
        self.incTurn()
      }
    })
  }


}
