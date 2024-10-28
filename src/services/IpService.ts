import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IPAdress } from '../models/IPAdress'

export const ipAPI = createApi({
  reducerPath: 'ipAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.ipify.org?format=json',
  }),
  endpoints: (build) => ({
    fetchIP: build.query<IPAdress, void>({
      query: () => ({
        url: '',
        method: 'GET',
      }),
    }),
  }),
})
