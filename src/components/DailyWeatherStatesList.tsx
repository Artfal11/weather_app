import { useAppSelector } from '../hooks/redux'
import { weatherStateAPI } from '../services/WeatherStateService'
import DayDetail from './DayDetail'

const DailyWeatherStatesList = () => {
  const { searchValue } = useAppSelector((state) => state.searchReducer)
  const { data: LocationWeatherStates } =
    weatherStateAPI.useFetchForecastWeatherStatesQuery({
      locationName: searchValue,
    })

  return (
    <div className="flex flex-col gap-[16px] rounded-[8px]">
      {LocationWeatherStates?.days.map((day) => (
        <DayDetail weatherState={day} key={day.datetimeEpoch} />
      ))}
    </div>
  )
}

export default DailyWeatherStatesList
