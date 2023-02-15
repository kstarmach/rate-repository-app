import { useMutation } from '@apollo/client'
import { CREATE_REVIEW } from '../graphql/mutations'

const createReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW)

  const sendReview = async ({ repositoryName, ownerName, rating, text }) => {
    // call the mutate function here with the right arguments
    const res = await mutate({
      variables: {
        review: { repositoryName, ownerName, rating: Number(rating), text },
      },
    })

    return res
  }

  return [sendReview, result]
}

export default createReview
