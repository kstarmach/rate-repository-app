import { gql } from '@apollo/client'
import { REPOSITORY_DETAILS } from './fragments'

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          ...RepositoryDetails
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
`

// other queries...

export const GET_REPOSITORY_DETAILS = gql`
  query repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      url
      ...RepositoryDetails
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
`

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`
