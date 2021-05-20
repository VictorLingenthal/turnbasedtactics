
import { GameService, IGameService, UnitID } from './gameService'
import{ UserService } from './userService'

import { gql } from '@apollo/client';
import { apolloClient } from './apolloClient'

import { ILiveUnit } from '../gamelogic/liveUnit'
import { IUnitAbility} from '../gamelogic/unitModels'

export interface IClientGameService extends IGameService {
  rerenderView: Function
}

export class ClientGameService extends GameService implements IClientGameService {

  public rerenderView: Function

  constructor (args) {
    super(args)
    this.setUpSubscription()
    this.rerenderView = () => {console.log('rerenderView() not Set')}
  }

  public dispatchAbility = (applyingUnit:ILiveUnit, unitAbility:IUnitAbility, receivingUnit:ILiveUnit, receivingUnits:ILiveUnit[]):void => {
    apolloClient.mutate({
      variables: {
        gameID: this.gameID,
        userID: UserService.getInstance().userID,
        applyingUnitID: this.createUnitID(applyingUnit),
        unitAbilityName: unitAbility.ability.name,
        receivingUnitID: this.createUnitID(receivingUnit),
        receivingUnitIDs: receivingUnits.map(unit => this.createUnitID(unit))
      },
      mutation: gql`
        mutation ApplyAbility(
          $gameID: ID,
          $userID: ID,
          $applyingUnitID: [ID],
          $unitAbilityName: String,
          $receivingUnitID: [ID],
          $receivingUnitIDs: [[ID]]
        ) {
          applyAbility(
            gameID: $gameID,
            userID: $userID,
            applyingUnitID: $applyingUnitID,
            unitAbilityName: $unitAbilityName,
            receivingUnitID: $receivingUnitID,
            receivingUnitIDs: $receivingUnitIDs
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
    apolloClient.subscribe({
      variables: {
        gameID: this.gameID
      },
      query: gql`
        subscription sendTurn ($gameID: ID) {
          sendTurn (gameID: $gameID) {
            applyingUnitID
            unitAbilityName
            receivingUnitID
            receivingUnitIDs
          }
        }
        `,
    }).subscribe({
      next (obj) {
        const args = obj.data.sendTurn
        self.callApplyAbility(
          args.applyingUnitID,
          args.unitAbilityName,
          args.receivingUnitID,
          args.receivingUnitIDs
        )
        self.rerenderView()
      }
    })
  }


}
