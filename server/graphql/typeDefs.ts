import { gql } from 'apollo-server-express'

import { authDefs } from './typedefs/auth'
import { gameDefs } from './typedefs/game'
import { gameListDefs } from './typedefs/gameList'

export const typeDefs = gql`

  type Query {
    name: String
    units: [Unit]
  }

  type Mutation {
    addName(name: String): String
  }

  ${authDefs}
  ${gameDefs}
  ${gameListDefs}


`;
