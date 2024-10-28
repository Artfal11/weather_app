import { useParams } from 'react-router-dom'
import { weatherStateAPI } from '../services/WeatherStateService'
import { useAppSelector } from '../hooks/redux'
import DayDetail from './DayDetail'
import { Months } from '../models/Months'
import PlaceName from './PlaceName'

const DayPage = () => {
  const { searchValue } = useAppSelector((state) => state.searchReducer)
  const { datetime } = useParams()

  const {
    data: dayWeatherState,
    isLoading: dayWeatherStateIsLoad,
    isError: dayWeatherStateIsError,
  } = weatherStateAPI.useFetchDayQuery({
    locationName: searchValue,
    dayDate: datetime,
  })

  const date = dayWeatherState && new Date(dayWeatherState.days[0].datetime)

  return (
    <div>
      {dayWeatherStateIsLoad && <h1>Загрузка...</h1>}
      {dayWeatherStateIsError && <h1>Проиозошла ошибка при загрузке</h1>}
      {!dayWeatherStateIsLoad && !dayWeatherStateIsError && dayWeatherState && (
        <div className="container mx-auto py-[8px]">
          <PlaceName
            newText={`: Погода на ${date?.getDate()} ${
              date && Months[date.getMonth()]
            }`}
            isLarge={true}
          />
          {dayWeatherState && (
            <DayDetail weatherState={dayWeatherState.days[0]} />
          )}
        </div>
      )}
    </div>
  )
}

export default DayPage
