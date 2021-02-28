
import merge from "lodash/merge.js"

import { PubSub } from 'apollo-server'

const pubsub = new PubSub();

import { ServerGameService } from '../frontend/src/services/serverGameService'

const serverGameService = new ServerGameService

export type Unittype = {
  name: string
  maxlife: number
  life: number
  abilities: Array<Ability>
}
export type Ability = {
  name: string
  damage: number
  // apply: Function
  target: string
}

const initResolvers = {
  Query: {
    name: () => 'Peter',
    units: () => [{
      name: 'knight',
      maxlife: 40,
      abilities: [{
        name: 'Attack',
        damage: 5,
        target: 'enemy',
      }]
    }]
  },
  Mutation : {
    addName: (__:any, args:any) => args.name,
    applyAbility: (__:any, args:any) => {

      console.log('applyAbility')
      console.log(pubsub.publish)

      pubsub.publish('SEND_TURN', {
        sendTurn: {
          applyingUnitID: args.applyingUnitID,
          unitAbilityName: args.unitAbilityName,
          recivingUnitID: args.recivingUnitID,
          recivingUnitIDs: args.recivingUnitIDs
        }
      });

      serverGameService.callApplyAbility(
        args.applyingUnitID,
        args.unitAbilityName,
        args.recivingUnitID,
        args.recivingUnitIDs
      )
      return 'applyAbility: ' + args.applyingUnitID + " - " + args.unitAbilityName + " - " + args.recivingUnitID + " - " + args.recivingUnitIDs
    },
  },
  Subscription: {
    sendTurn: {
      subscribe: (_:any, __:any) => {
        console.log('Send Turn')
        return pubsub.asyncIterator('SEND_TURN')
      },
    },
  },
}

export const resolvers = merge(
  initResolvers
)
