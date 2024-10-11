import { images } from '../constants/constants'
import { useAppSelector } from '../hooks/redux'
import { weatherStateAPI } from '../services/WeatherStateService'
import SliderForCurrentWeatherState from './SliderForCurrentWeatherState'
import {
  windDirection,
  leadingZero,
  getCurrentTime,
  numberWithSign,
} from '../utils/utils'
import { citiesAPI } from '../services/CitiesService'

const CurrentWeatherState = () => {
  const { searchValue } = useAppSelector((state) => state.searchReducer)
  const { data: LocationWeatherStates } =
    weatherStateAPI.useFetchForecastWeatherStatesQuery({
      locationName: searchValue,
    })

  let regex =
    /^-?(180(\.0+)?|1[0-7]\d(\.\d+)?|[1-9]?\d(\.\d+)?)\s*,\s*-?(90(\.0+)?|[1-8]?\d(\.\d+)?)$/

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

  return (
    <div className="w-[45%]">
      {LocationWeatherStates && (
        <div
          className="bg-cover p-[24px] text-white rounded-[8px]"
          style={{
            backgroundImage: `url('${
              images.find(
                (weatherImage) =>
                  weatherImage.weatherCode ==
                  LocationWeatherStates?.currentConditions.icon
              )?.backgroundImage
            }')`,
          }}
        >
          <h1 className="font-medium text-[16px]">
            {isLoading && <span>Загрузка...</span>}
            {isError && <span>Произошла ошибка при загрузке</span>}
            {placeName &&
            !isLoading &&
            !isError &&
            regex.test(LocationWeatherStates.resolvedAddress)
              ? (placeName.suggestions[0].data.city &&
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
              : LocationWeatherStates.resolvedAddress.split(', ')[0] +
                ', ' +
                LocationWeatherStates.resolvedAddress.split(', ')[1]}
          </h1>
          <h3 className="opacity-70 text-[16px]">
            Сейчас{' '}
            {leadingZero(getCurrentTime(LocationWeatherStates)?.hour()) +
              ':' +
              leadingZero(getCurrentTime(LocationWeatherStates)?.minute())}
          </h3>
          <div className="flex items-center mb-[16px]">
            <span className="text-[48px] after:content-['\00B0'] mr-[10px]">
              {numberWithSign(LocationWeatherStates.currentConditions.temp)}
            </span>
            <img
              className="w-[48px] h-[48px] mr-[15px]"
              src={`${
                images.find(
                  (weatherImage) =>
                    weatherImage.weatherCode ==
                    LocationWeatherStates?.currentConditions.icon
                )?.image
              }`}
              alt=""
            />
            <div className="flex flex-col">
              <span className="text-[16px]">
                {LocationWeatherStates?.currentConditions.conditions}
              </span>
              <span className="opacity-70 text-[16px]">
                Ощущуается как{' '}
                <span className="after:content-['\00B0']">
                  {numberWithSign(
                    LocationWeatherStates.currentConditions.feelslike
                  )}
                </span>
              </span>
            </div>
          </div>

          <div className="flex gap-[50px]">
            <div className="flex text-[16px] gap-[8px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="opacity-70"
                viewBox="0 0 16 16"
              >
                <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5" />
              </svg>
              {(
                LocationWeatherStates?.currentConditions.windspeed / 3.6
              ).toFixed(1)}{' '}
              м/c,{' '}
              {windDirection(LocationWeatherStates.currentConditions.winddir)}
            </div>
            <div className="flex text-[16px] gap-[8px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="opacity-70"
                viewBox="0 0 16 16"
              >
                <path d="M13.5 0a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V7.5h-1.5a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V15h-1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5V.5a.5.5 0 0 0-.5-.5zM7 1.5l.364-.343a.5.5 0 0 0-.728 0l-.002.002-.006.007-.022.023-.08.088a29 29 0 0 0-1.274 1.517c-.769.983-1.714 2.325-2.385 3.727C2.368 7.564 2 8.682 2 9.733 2 12.614 4.212 15 7 15s5-2.386 5-5.267c0-1.05-.368-2.169-.867-3.212-.671-1.402-1.616-2.744-2.385-3.727a29 29 0 0 0-1.354-1.605l-.022-.023-.006-.007-.002-.001zm0 0-.364-.343zm-.016.766L7 2.247l.016.019c.24.274.572.667.944 1.144.611.781 1.32 1.776 1.901 2.827H4.14c.58-1.051 1.29-2.046 1.9-2.827.373-.477.706-.87.945-1.144zM3 9.733c0-.755.244-1.612.638-2.496h6.724c.395.884.638 1.741.638 2.496C11 12.117 9.182 14 7 14s-4-1.883-4-4.267" />
              </svg>
              {Math.round(LocationWeatherStates?.currentConditions.humidity)}%
            </div>
            <div className="flex text-[16px] gap-[8px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="opacity-70"
                viewBox="0 0 16 16"
              >
                <path d="M8 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                <path d="M8 0a2.5 2.5 0 0 0-2.5 2.5v7.55a3.5 3.5 0 1 0 5 0V2.5A2.5 2.5 0 0 0 8 0M6.5 2.5a1.5 1.5 0 1 1 3 0v7.987l.167.15a2.5 2.5 0 1 1-3.333 0l.166-.15z" />
              </svg>
              {Math.round(
                LocationWeatherStates?.currentConditions.pressure * 0.750062
              )}{' '}
              мм.рт.ст
            </div>
          </div>
          <div className="border-[1px] bg-white opacity-30 my-[36px]"></div>
          <SliderForCurrentWeatherState />
        </div>
      )}
    </div>
  )
}

export default CurrentWeatherState
