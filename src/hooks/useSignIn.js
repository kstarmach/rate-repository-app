import { useMutation } from '@apollo/client'
import { AUTHENTICATE } from '../graphql/mutations'
// import AuthStorage from '../utils/authStorage'
// import { useContext } from 'react'
// import AuthStorageContext from '../contexts/AuthStorageContext'

import useAuthStorage from '../hooks/useAuthStorage'
import { useApolloClient } from '@apollo/client'

const useSignIn = () => {
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()
  const [mutate, result] = useMutation(AUTHENTICATE)

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    const res = await mutate({
      variables: { credentials: { username, password } },
    })

    authStorage.setAccessToken(res.data.authenticate.accessToken)
    apolloClient.resetStore()
    return res
  }

  return [signIn, result]
}

export default useSignIn
