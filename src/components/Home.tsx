import DailyWeatherStates from './DailyWeatherStates'
import CurrentWeatherState from './CurrentWeatherState'
import CitiesList from './CitiesList'
import SunCard from './SunCard'
import { useAppSelector } from '../hooks/redux'
import { weatherStateAPI } from '../services/WeatherStateService'
import DailyWeatherStatesList from './DailyWeatherStatesList'

const Home = () => {
  const { searchValue } = useAppSelector((state) => state.searchReducer)
  const {
    data: LocationWeatherStates,
    isError,
    isLoading,
  } = weatherStateAPI.useFetchForecastWeatherStatesQuery(
    {
      locationName: searchValue,
    },
    {
      skip: searchValue.length == 0,
    }
  )

  return (
    <div className="container mx-auto">
      {isLoading && <h1>Загрузка...</h1>}
      {isError && <h1>Произошла ошибка при загрузке</h1>}
      {LocationWeatherStates && !isLoading && !isError && (
        <div>
          <div className="flex my-[16px] justify-between">
            <CurrentWeatherState />
            <SunCard
              weatherStateDaily={LocationWeatherStates.days[0]}
              isVisible={true}
            />
            <CitiesList />
          </div>

          <DailyWeatherStates />
          <DailyWeatherStatesList />
        </div>
      )}
    </div>
  )
}

export default Home
