// import { ApolloClient, InMemoryCache } from '@apollo/client'
// import Constants from 'expo-constants'
// import { setContext } from '@apollo/client/link/context';

// // const httpLink = createHttpLink({
// //   // Replace the IP address part with your own IP address!
// //   uri: 'http://192.168.1.27:4000/graphql',
// // })

// const createApolloClient = () => {
//   const uri = Constants.manifest.extra.uri
//   return new ApolloClient({
//     //link: httpLink,
//     uri,
//     cache: new InMemoryCache(),
//   })
// }

// export default createApolloClient

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import Constants from 'expo-constants'
import { setContext } from '@apollo/client/link/context'
// You might need to change this depending on how you have configured the Apollo Server's URI
const { uri } = Constants.manifest.extra

const httpLink = createHttpLink({
  uri: uri,
})

const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken()
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      }
    } catch (e) {
      console.log(e)
      return { headers }
    }
  })
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })
}
export default createApolloClient
