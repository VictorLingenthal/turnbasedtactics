
import { withFilter } from 'apollo-server'
import { RedisPubSub } from 'graphql-redis-subscriptions';
const pubSub = new RedisPubSub();

import { ServerGameListService } from '../../services/serverGameListService'

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

export const gameResolver = {
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

      const game = ServerGameListService.getInstance().getGameByID(args.gameID)

      if (game?.gameService?.checkCurrentPlayerByID(args.userID)) {
        game.gameService.callApplyAbility(
          args.applyingUnitID,
          args.unitAbilityName,
          args.receivingUnitID,
          args.receivingUnitIDs
        )

        // console.log('Call PubSub Publish')
        pubSub.publish('SEND_TURN', {
          sendTurn: {
            gameID: game.gameID,
            applyingUnitID: args.applyingUnitID,
            unitAbilityName: args.unitAbilityName,
            receivingUnitID: args.receivingUnitID,
            receivingUnitIDs: args.receivingUnitIDs
          }
        });
      } else {
        console.log("This is not the users turn")
      }

      return 'applyAbility: ' + args.applyingUnitID + " - " + args.unitAbilityName + " - " + args.receivingUnitID + " - " + args.receivingUnitIDs
    },
  },
  Subscription: {
    sendTurn: {
      subscribe: withFilter(
        (_:any, __:any) =>
          pubSub.asyncIterator('SEND_TURN')
        ,
        (payload, variables) =>
          payload.sendTurn.gameID === variables.gameID
      )
    },
  },
}
