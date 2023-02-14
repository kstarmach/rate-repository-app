import { useQuery } from '@apollo/client'
import { GET_REPOSITORY_DETAILS } from '../graphql/queries'

const useRepositoryDetails = ({ repositoryId }) => {
  const { data, loading, refetch } = useQuery(GET_REPOSITORY_DETAILS, {
    fetchPolicy: 'cache-and-network',
    variables: { repositoryId },
  })

  return {
    repository: data ? data.repository : undefined,
    loading,
    refetch,
  }
}

export default useRepositoryDetails
