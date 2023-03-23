import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser, ServerResponse, IRepo } from '../../models/models'
import { BaseQueryResult } from '@reduxjs/toolkit/dist/query/baseQueryTypes'

export const githubApi = createApi({
  reducerPath: 'github/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com'
  }),
  refetchOnFocus: true,
  endpoints: build => ({
    searchUsers: build.query<ServerResponse<IUser[]>, string>({
      query: (search: string) => ({
        url: `search/users`,
        params: {
          q: search,
          per_page: 10
        }
      }),
      transformResponse: (response:BaseQueryResult<any>) => response.items
    }),
    getUserRepos: build.query<IRepo[], string>({
      query: (username: string) => ({
        url: `users/${username}/repos`
      })
    })
  })
})

export const { useSearchUsersQuery, useLazyGetUserReposQuery } = githubApi