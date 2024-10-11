import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Suggestions {
  suggestions: [
    suggestion: {
      value: string
      data: {
        geo_lat: number
        geo_lon: number
        city_with_type: string
        region_with_type: string
        settlement_with_type: string
        area_with_type: string
        area: string
        region: string
        city: string
        settlement: string
      }
    }
  ]
}

interface Geolocation {
  latitude: number
  longitude: number
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
  }),
})
