import { CurrentConditions } from './CurrentConditions'
import { WeatherStateDaily } from './WeatherStateDaily'

export interface LocationWeatherState {
  currentConditions: CurrentConditions
  days: WeatherStateDaily[]
  queryCost: number
  latitude: number
  longitude: number
  resolvedAddress: string
  address: string
  timezone: string
  tzoffset: number
}
