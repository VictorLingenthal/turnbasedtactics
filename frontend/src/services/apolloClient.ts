
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink, split, gql } from '@apollo/client';

import { WebSocketLink } from '@apollo/client/link/ws';

import { getMainDefinition } from 'apollo-utilities';


const httpLink = new HttpLink({
  uri: 'http://localhost:4444/graphql'
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4444/graphql',
  options: {
    reconnect: true
  }
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

// Instantiate client
export const apolloClient = new ApolloClient({
  link: splitLink,
  uri: "http://localhost:4444/graphql",
  cache: new InMemoryCache()
})

apolloClient.subscribe({
  query: gql`
    subscription onTurn {
      sendTurn {
        applyingUnitID
        unitAbilityName
        recivingUnitID
        recivingUnitIDs
      }
    }
    `,
  variables: {}
}).subscribe({
  next (data) {
    console.log('Subscription onTurn event')
    console.log(data)
    // Notify your application with the new arrived data
  }
});
