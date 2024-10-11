import moment from 'moment'
import 'moment-timezone'
import { LocationWeatherState } from '../models/LocationWeatherState'
import { moonphases } from '../constants/constants'

export const windDirection = (deg: number) => {
  if (deg > 337.5 || deg <= 22.5) {
    return 'С'
  } else if (deg > 22.5 && deg <= 67.5) {
    return 'СВ'
  } else if (deg > 67.5 && deg <= 112.5) {
    return 'В'
  } else if (deg > 112.5 && deg <= 167.5) {
    return 'ЮВ'
  } else if (deg > 167.5 && deg <= 202.5) {
    return 'Ю'
  } else if (deg > 202.5 && deg <= 247.5) {
    return 'ЮЗ'
  } else if (deg > 247.5 && deg <= 292.5) {
    return 'З'
  } else if (deg > 292.5 && deg <= 337.5) {
    return 'СЗ'
  }
}

export const leadingZero = (token: number | undefined) => {
  return ('0' + token).slice(-2)
}

export const getCurrentTime = (LocationWeatherStates: LocationWeatherState) => {
  if (LocationWeatherStates) {
    let date = moment.tz(Date.now(), LocationWeatherStates?.timezone)
    return date
  }
}

export const numberWithSign = (number: number) => {
  return Math.floor(number) > 0 ? '+' + Math.floor(number) : Math.floor(number)
}

export const moonPhaseToString = (moonphase: number) => {
  if (moonphase == 0) {
    return moonphases[0]
  } else if (moonphase > 0 && moonphase < 0.25) {
    return moonphases[1]
  } else if (moonphase == 0.25) {
    return moonphases[2]
  } else if (moonphase > 0.25 && moonphase < 0.5) {
    return moonphases[3]
  } else if (moonphase == 0.5) {
    return moonphases[4]
  } else if (moonphase > 0.5 && moonphase < 0.75) {
    return moonphases[5]
  } else if (moonphase == 0.75) {
    return moonphases[6]
  } else {
    return moonphases[7]
  }
}

export const uvIndexToString = (uvindex: number) => {
  if (uvindex <= 2) {
    return 'Низкий УФ-индекс'
  } else if (uvindex >= 3 && uvindex <= 5) {
    return 'Средний УФ-индекс'
  } else if (uvindex >= 6 && uvindex <= 7) {
    return 'Высокий УФ-индекс'
  } else if (uvindex >= 8 && uvindex <= 10) {
    return 'Очень высокий УФ-индекс'
  } else {
    return 'Экстремальный УФ-индекс'
  }
}

export const arrayMin = (arr: any[]) => {
  return arr.reduce(function (p, v) {
    return p < v ? p : v
  })
}

export const arrayMax = (arr: any[]) => {
  return arr.reduce(function (p, v) {
    return p > v ? p : v
  })
}

export const TimeOfDay = (str: string) => {
  if (str.includes('05:00:00')) {
    return 'Утром'
  } else if (str.includes('12:00:00')) {
    return 'Днем'
  } else if (str.includes('17:00:00')) {
    return 'Вечером'
  } else {
    return 'Ночью'
  }
}
