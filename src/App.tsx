import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header, Home, MonthlyWeatherState, DayPage, Popup } from './components'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import { useEffect } from 'react'
import { searchSlice } from './store/reducers/SearchSlice'
import { popupSlice } from './store/reducers/PopupSlice'
import { citiesAPI } from './services/CitiesService'
import { ipAPI } from './services/IpService'

const App = () => {
  const { popupVisible } = useAppSelector((state) => state.popupReducer)
  const { makeVisible } = popupSlice.actions
  const { change } = searchSlice.actions
  const dispatch = useAppDispatch()

  const { data: ipAdress } = ipAPI.useFetchIPQuery()

  const { data: placeName } = citiesAPI.useFetchGeolocationByIpQuery(
    {
      ip: ipAdress?.ip,
    },
    { skip: !ipAdress }
  )

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(
          change(position.coords.latitude + ', ' + position.coords.longitude)
        )
      },
      (error) => {
        dispatch(makeVisible())
        placeName && dispatch(change(placeName.location.value))
      }
    )
  }, [placeName])

  return (
    <BrowserRouter>
      <div
        className={`${
          popupVisible ? 'overflow-hidden h-[100vh] w-[100vw] ' : ''
        }font-rubik bg-[#eceef2] min-h-[100vh]`}
      >
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/month" element={<MonthlyWeatherState />}></Route>
          <Route path="/day/:location/:datetime" element={<DayPage />}></Route>
        </Routes>
        <Popup />
      </div>
    </BrowserRouter>
  )
}

export default App
