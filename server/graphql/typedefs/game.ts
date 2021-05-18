import { gql } from 'apollo-server-express'

export const gameDefs = gql`

  type Unit {
    name: String
    maxlife: Int
    abilities: [Ability]
  }

  type Ability {
    name: String
    damage: Int
    target: String
  }

  type changeTurnInfo {
    applyingUnitID: [ID]
    unitAbilityName: String
    recivingUnitID: [ID]
    recivingUnitIDs:[[ID]]
  }

  extend type Mutation {

    applyAbility(
      gameID: ID
      userID: ID
      applyingUnitID: [ID]
      unitAbilityName: String
      recivingUnitID: [ID]
      recivingUnitIDs:[[ID]]
    ):String

  }

  type Subscription {
    sendTurn(gameID: ID): changeTurnInfo
  }

`
