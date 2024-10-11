import { FC } from 'react'
import { weatherStateAPI } from '../services/WeatherStateService'
import { images } from '../constants/constants'
import { useAppDispatch } from '../hooks/redux'
import { searchSlice } from '../store/reducers/SearchSlice'
import { numberWithSign } from '../utils/utils'

interface CitiesListItemProps {
  cityName: string
}

const CitiesListItem: FC<CitiesListItemProps> = ({ cityName }) => {
  const { change } = searchSlice.actions
  const dispatch = useAppDispatch()

  let selectCity = (e: string) => {
    dispatch(change(e))
  }

  const {
    data: CityWeatherState,
    isError,
    isLoading,
  } = weatherStateAPI.useFetchForecastWeatherStatesQuery({
    locationName: cityName,
  })

  return (
    <div>
      {isLoading && <h1 className="my-[14px]">Загрузка...</h1>}
      {isError && <h1>Произошла ошибка при загрузке</h1>}
      {CityWeatherState && !isLoading && !isError && (
        <div
          className="flex my-[14px] cursor-pointer"
          onClick={() =>
            CityWeatherState
              ? selectCity(CityWeatherState?.address)
              : selectCity('')
          }
        >
          <img
            className="w-[26px] h-[26px] mr-[8px]"
            src={`${
              images.find(
                (weatherImage) =>
                  weatherImage.weatherCode ==
                  CityWeatherState?.currentConditions.icon
              )?.image
            }`}
            alt=""
          />
          <span className="after:content-['\00B0'] mr-[8px] text-[16px]">
            {CityWeatherState &&
              numberWithSign(CityWeatherState.currentConditions.temp)}
          </span>
          <span className="text-[16px]">{CityWeatherState?.address}</span>
        </div>
      )}
    </div>
  )
}

export default CitiesListItem
