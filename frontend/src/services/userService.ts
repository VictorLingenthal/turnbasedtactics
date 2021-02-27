
import { gql } from '@apollo/client';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

export interface IUserService {

}

export class UserService implements IUserService {

  private apolloClient:ApolloClient<NormalizedCacheObject>

  constructor (apolloClient:ApolloClient<NormalizedCacheObject>) {
    this.apolloClient = apolloClient
  }


}
