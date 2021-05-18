import { gql } from 'apollo-server-express'

export const authDefs = gql`

  type LoginSuccess {
    userID: String
    sessionID: String
    message: String
  }

  extend type Mutation {

    checkAuth(
      sessionID: String
    ):LoginSuccess

    login(
      username: String
      password: String
    ):LoginSuccess

    register(
      username: String
      password: String
      confirmPassword: String
    ):LoginSuccess

  }

`
