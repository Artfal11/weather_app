import { combineReducers, configureStore } from '@reduxjs/toolkit'
import searchReducer from './reducers/SearchSlice'
import popupReducer from './reducers/PopupSlice'
import { weatherStateAPI } from '../services/WeatherStateService'
import { citiesAPI } from '../services/CitiesService'
import { ipAPI } from '../services/IpService'

const rootReducer = combineReducers({
  popupReducer,
  searchReducer,
  [weatherStateAPI.reducerPath]: weatherStateAPI.reducer,
  [citiesAPI.reducerPath]: citiesAPI.reducer,
  [ipAPI.reducerPath]: ipAPI.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(weatherStateAPI.middleware)
        .concat(citiesAPI.middleware)
        .concat(ipAPI.middleware),
  })
}

export type AppStore = ReturnType<typeof setupStore>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = AppStore['dispatch']
