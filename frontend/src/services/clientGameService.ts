
import { GameService, IGameService, UnitID } from './gameService'

import { gql } from '@apollo/client';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

import { ILiveUnit } from '../gamelogic/liveUnit'
import { IUnitAbility} from '../gamelogic/unitModels'

export class ClientGameService extends GameService implements IGameService {

  private apolloClient: ApolloClient<NormalizedCacheObject>
  public incTurn: Function

  constructor (apolloClient:ApolloClient<NormalizedCacheObject>) {
    super()
    this.apolloClient = apolloClient
    this.setUpSubscription()
    this.incTurn = () => {console.log('incTurn() not Set')}
  }

  public dispatchAbility = (applyingUnit:ILiveUnit, unitAbility:IUnitAbility, recivingUnit:ILiveUnit, recivingUnits:ILiveUnit[]):void => {
    this.apolloClient.mutate({
      variables: {
        applyingUnitID: this.createUnitID(applyingUnit),
        unitAbilityName: unitAbility.ability.name,
        recivingUnitID: this.createUnitID(recivingUnit),
        recivingUnitIDs: recivingUnits.map(unit => this.createUnitID(unit))
      },
      mutation: gql`
        mutation ApplyAbility(
          $applyingUnitID: [ID],
          $unitAbilityName: String,
          $recivingUnitID: [ID],
          $recivingUnitIDs: [[ID]]
        ) {
          applyAbility(
            applyingUnitID: $applyingUnitID,
            unitAbilityName: $unitAbilityName,
            recivingUnitID: $recivingUnitID,
            recivingUnitIDs: $recivingUnitIDs
          )
        }
      `
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  private setUpSubscription = () => {
    const self = this
    this.apolloClient.subscribe({
      query: gql`
        subscription onTurn {
          sendTurn {
            applyingUnitID
            unitAbilityName
            recivingUnitID
            recivingUnitIDs
          }
        }
        `,
      variables: {}
    }).subscribe({
      next (obj) {
        console.log('Subscription onTurn event new')
        const args = obj.data.sendTurn

        self.unitCountByPlayer()

        self.callApplyAbility(
          args.applyingUnitID,
          args.unitAbilityName,
          args.recivingUnitID,
          args.recivingUnitIDs
        )

        self.incTurn()
        self.unitCountByPlayer()
      }
    })
  }


}
