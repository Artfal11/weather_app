import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LocationWeatherState } from '../models/LocationWeatherState'

interface ForecastQueryParameters {
  locationName: string
}

interface DataRangeQueryParameters {
  locationName: string
  startDay: string
  endDay: string
}

interface DayQueryParameters {
  locationName: string
  dayDate?: string
}

export const weatherStateAPI = createApi({
  reducerPath: 'weatherStateAPI',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline',
  }),
  endpoints: (build) => ({
    fetchForecastWeatherStates: build.query<
      LocationWeatherState,
      ForecastQueryParameters
    >({
      query: ({ locationName }) => ({
        url:
          '/' +
          locationName +
          '?key=SNFAR9597GG5UGNWWRTFXVMR4' +
          '&include=days,current,hours' +
          '&unitGroup=metric' +
          '&lang=ru',
      }),
    }),
    fetchDataRange: build.query<LocationWeatherState, DataRangeQueryParameters>(
      {
        query: ({ locationName, startDay, endDay }) => ({
          url:
            '/' +
            locationName +
            '/' +
            startDay +
            '/' +
            endDay +
            '?key=SNFAR9597GG5UGNWWRTFXVMR4' +
            '&include=days' +
            '&unitGroup=metric' +
            '&lang=ru',
        }),
      }
    ),
    fetchDay: build.query<LocationWeatherState, DayQueryParameters>({
      query: ({ locationName, dayDate }) => ({
        url:
          '/' +
          locationName +
          '/' +
          dayDate +
          '?key=SNFAR9597GG5UGNWWRTFXVMR4' +
          '&include=days,hours' +
          '&unitGroup=metric' +
          '&lang=ru',
      }),
    }),
  }),
})
