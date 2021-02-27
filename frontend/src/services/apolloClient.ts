
import { ApolloClient, InMemoryCache } from '@apollo/client';

// import { WebSocketLink } from '@apollo/client/link/ws';

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false
  }),
  uri: '/graphql',
});

// const wsLink = new WebSocketLink({
//   uri: 'ws://localhost:4444/graphql',
//   options: {
//     reconnect: true
//   }
// });
