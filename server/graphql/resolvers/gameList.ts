
// import { RedisPubSub } from 'graphql-redis-subscriptions';
// const pubSub = new RedisPubSub();

import { pubSub } from '../../../frontend/src/services/redisclient'

import { ServerGameListService } from './../../services/serverGameListService'
import { UserService } from './../../services/userService'

export const gameListResolver = {
  Query: {
    getGameList: () => ServerGameListService.getInstance().getGameList()
  },
  Mutation: {
    openGame: (__:any, args:any) => {

      const serverGameListService = ServerGameListService.getInstance()
      const userService = UserService.getInstance()
      const user = userService.findUserByUserID(args.userID)
      const newgame = serverGameListService.startGame(user)

      newgame.publish_update()

    },
    joinGame: (__:any, args:any) => {

      const serverGameListService = ServerGameListService.getInstance()
      const newgame = serverGameListService.joinGame(args.gameID, args.userID)

      if (newgame)
        newgame.publish_update(true)

    },
  },
  Subscription: {
    updateGameList: {
      subscribe: (_:any, __:any) => pubSub.asyncIterator(['UPDATE_GAMELIST'])
    },
  }

}
