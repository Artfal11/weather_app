import { FC } from 'react'
import { regex } from '../constants/constants'
import { useAppSelector } from '../hooks/redux'
import { citiesAPI } from '../services/CitiesService'
import { weatherStateAPI } from '../services/WeatherStateService'
import { ipAPI } from '../services/IpService'

interface PlaceNameProps {
  isLarge: boolean
  newText: string
}

const PlaceName: FC<PlaceNameProps> = ({ isLarge, newText }) => {
  const { searchValue } = useAppSelector((state) => state.searchReducer)
  const { data: LocationWeatherStates } =
    weatherStateAPI.useFetchForecastWeatherStatesQuery({
      locationName: searchValue,
    })

  const {
    data: placeName,
    isLoading,
    isError,
  } = citiesAPI.useFetchGeolocationQuery(
    {
      latitude: Number(searchValue.split(', ')[0]),
      longitude: Number(searchValue.split(', ')[1]),
    },
    { skip: !regex.test(searchValue) }
  )

  const { data: ipAdress } = ipAPI.useFetchIPQuery()

  const { data: placeNameByIP } = citiesAPI.useFetchGeolocationByIpQuery(
    {
      ip: ipAdress?.ip,
    },
    { skip: !ipAdress }
  )

  return (
    <h1 className={`font-medium text-[${isLarge ? '24px' : '16px'}] leading-0`}>
      {isLoading && <span>Загрузка...</span>}
      {isError && <span>Произошла ошибка при загрузке</span>}
      {placeName &&
      !isLoading &&
      !isError &&
      LocationWeatherStates &&
      !(placeName?.suggestions.length == 0) &&
      regex.test(LocationWeatherStates.resolvedAddress)
        ? (placeName.suggestions[0].data.city &&
            placeName.suggestions[0].data.region &&
            placeName.suggestions[0].data.city !=
              placeName.suggestions[0].data.region &&
            placeName.suggestions[0].data.city +
              ', ' +
              placeName.suggestions[0].data.region_with_type) ||
          (placeName.suggestions[0].data.settlement &&
            placeName.suggestions[0].data.region &&
            placeName.suggestions[0].data.settlement_with_type +
              ', ' +
              placeName.suggestions[0].data.region_with_type) ||
          placeName.suggestions[0].data.region_with_type
        : LocationWeatherStates?.resolvedAddress.split(', ')[0] +
          ', ' +
          LocationWeatherStates?.resolvedAddress.split(', ')[1]}
      {placeNameByIP &&
        placeName?.suggestions.length == 0 &&
        placeNameByIP?.location.value}
      {newText}
    </h1>
  )
}

export default PlaceName
