
import merge from "lodash/merge.js"

import { userResolver } from './resolvers/user'
import { gameResolver } from './resolvers/game'
import { gameListResolver } from './resolvers/gameList'

const initResolvers = {
  Query: {
    name: () => 'Peter',
  },
  Mutation : {
    addName: (__:any, args:any) => args.name,
  },
}

export const resolvers = merge(
  initResolvers,
  userResolver,
  gameResolver,
  gameListResolver,
)
