import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Suggestion } from '../models/Suggestion'
import { Geolocation } from '../models/Geolocation'
import { IPAdress } from '../models/IPAdress'

export interface Suggestions {
  suggestions: Suggestion[]
}

interface Location {
  location: Suggestion
}

export const citiesAPI = createApi({
  reducerPath: 'citiesAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://suggestions.dadata.ru/suggestions/api/4_1/rs',
  }),
  endpoints: (build) => ({
    fetchSuggestions: build.query<Suggestions, string>({
      query: (locationName) => ({
        url: '/suggest/address',
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Token 4c104e0c133c5b70926c0e1d1dbc994834261f55',
        },
        body: JSON.stringify({
          query: locationName,
          count: 10,
          from_bound: { value: 'region' },
          to_bound: { value: 'settlement' },
        }),
      }),
    }),
    fetchGeolocation: build.query<Suggestions, Geolocation>({
      query: ({ latitude, longitude }) => ({
        url: '/geolocate/address',
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Token 4c104e0c133c5b70926c0e1d1dbc994834261f55',
        },
        body: JSON.stringify({ lat: latitude, lon: longitude }),
      }),
    }),
    fetchGeolocationByIp: build.query<Location, IPAdress>({
      query: ({ ip }) => ({
        url: '/iplocate/address?ip=' + ip,
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Token 4c104e0c133c5b70926c0e1d1dbc994834261f55',
        },
      }),
    }),
  }),
})
