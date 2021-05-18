import { gql } from 'apollo-server-express'

export const gameListDefs = gql`

  type PlayerStub {
    username: String
    userID: ID
  }

  type GameStub {
    startNewGame: Boolean
    gameName: String
    gameID: ID
    gameState: ID
    players: [PlayerStub]
  }

  extend type Query {
    getGameList: [GameStub]
  }

  extend type Mutation {
    openGame(
      userID: ID
    ): Boolean
    joinGame(
      userID: ID
      gameID: ID
    ): Boolean
  }

  extend type Subscription {
    updateGameList: GameStub
  }

`
