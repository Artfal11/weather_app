import { combineReducers, configureStore } from '@reduxjs/toolkit'
import searchReducer from './reducers/SearchSlice'
import { weatherStateAPI } from '../services/WeatherStateService'
import { citiesAPI } from '../services/CitiesService'

const rootReducer = combineReducers({
  searchReducer,
  [weatherStateAPI.reducerPath]: weatherStateAPI.reducer,
  [citiesAPI.reducerPath]: citiesAPI.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(weatherStateAPI.middleware)
        .concat(citiesAPI.middleware),
  })
}

export type AppStore = ReturnType<typeof setupStore>
export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = AppStore['dispatch']
