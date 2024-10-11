import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header, Home, MonthlyWeatherState } from './components'
import { useAppDispatch } from './hooks/redux'
import { useEffect } from 'react'
import { searchSlice } from './store/reducers/SearchSlice'

const App = () => {
  const { change } = searchSlice.actions
  const dispatch = useAppDispatch()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      dispatch(
        change(position.coords.latitude + ', ' + position.coords.longitude)
      )
    })
  }, [])

  return (
    <BrowserRouter>
      <div className="font-rubik bg-[#eceef2]">
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/month" element={<MonthlyWeatherState />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
