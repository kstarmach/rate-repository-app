import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../graphql/mutations'

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER)

  const signUp = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    const res = await mutate({
      variables: { user: { username, password } },
    })

    return res
  }

  return [signUp, result]
}

export default useSignUp