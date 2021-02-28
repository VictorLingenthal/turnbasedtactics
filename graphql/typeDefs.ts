import { gql } from 'apollo-server-express'

export const typeDefs = gql`

  type Query {
    name: String
    units: [Unit]
  }

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

  type Mutation {
    addName(name:String):String
    applyAbility(
      applyingUnitID: [ID]
      unitAbilityName: String
      recivingUnitID: [ID]
      recivingUnitIDs:[[ID]]
    ):String
  }

  type Subscription {
    sendTurn: changeTurnInfo
  }

`;
