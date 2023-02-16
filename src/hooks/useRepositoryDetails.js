import { useQuery } from '@apollo/client'
import { GET_REPOSITORY_DETAILS } from '../graphql/queries'

const useRepositoryDetails = (variables) => {
  const { data, loading, fetchMore, ...result } = useQuery(
    GET_REPOSITORY_DETAILS,
    {
      fetchPolicy: 'cache-and-network',
      variables,
    },
  )

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    })
  }

  return {
    repository: data?.repository,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  }
}

export default useRepositoryDetails
