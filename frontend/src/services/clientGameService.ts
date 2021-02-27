
import { GameService, IGameService } from './gameService'

import { gql } from '@apollo/client';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

import { ILiveUnit } from '../gamelogic/liveUnit'
import { IUnitAbility} from '../gamelogic/unitModels'

export class ClientGameService extends GameService implements IGameService {

  private apolloClient:ApolloClient<NormalizedCacheObject>

  constructor (apolloClient:ApolloClient<NormalizedCacheObject>) {
    super()
    this.apolloClient = apolloClient
  }

  public applyAbility = (applyingUnit:ILiveUnit, unitAbility:IUnitAbility, recivingUnit:ILiveUnit, recivingUnits:ILiveUnit[]):ILiveUnit[] => {

    console.log('ClientGameService - applyAbility')
    console.log(this.createUnitID(applyingUnit))
    console.log(unitAbility.ability.name)
    console.log(this.createUnitID(recivingUnit))
    console.log(recivingUnits.map(unit => this.createUnitID(unit)))

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

    return this.game.applyAbility(applyingUnit, unitAbility, recivingUnit, recivingUnits)
  }
}
