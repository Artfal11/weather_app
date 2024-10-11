import { FC } from 'react'
import { WeatherStateDaily } from '../models/WeatherStateDaily'
import { Months } from '../models/Months'
import { DaysOfWeek } from '../models/DaysOfWeek'
import { images } from '../constants/constants'
import { useAppSelector } from '../hooks/redux'
import { weatherStateAPI } from '../services/WeatherStateService'
import { getCurrentTime, numberWithSign } from '../utils/utils'

interface SmallStateProps {
  weatherStateDaily: WeatherStateDaily
  monthly: boolean
}

const SmallDayState: FC<SmallStateProps> = ({ weatherStateDaily, monthly }) => {
  const { searchValue } = useAppSelector((state) => state.searchReducer)
  const { data: LocationWeatherStates } =
    weatherStateAPI.useFetchForecastWeatherStatesQuery({
      locationName: searchValue,
    })

  let date = new Date(weatherStateDaily.datetime)
  return (
    <div className="flex flex-col w-[10vw]">
      <h4
        className={`${monthly ? 'hidden ' : ''}text-[18px]${
          date.getDay() == 0 || date.getDay() == 6 ? ' text-[#f66049]' : ''
        }`}
      >
        {LocationWeatherStates &&
        getCurrentTime(LocationWeatherStates)?.date() == date.getDate() &&
        getCurrentTime(LocationWeatherStates)?.month() == date.getMonth()
          ? 'Сегодня'
          : DaysOfWeek[date.getDay()]}
      </h4>
      <h5
        className={`text-[#939cb0] text-[14px] ${monthly && 'flex gap-[4px]'}`}
      >
        <span
          className={`${
            monthly &&
            LocationWeatherStates &&
            getCurrentTime(LocationWeatherStates)?.date() == date.getDate() &&
            getCurrentTime(LocationWeatherStates)?.month() == date.getMonth()
              ? 'block w-[24px] h-[24px] leading-[24px] bg-[#f66049] text-white text-center rounded-[50%]'
              : ''
          }`}
        >
          {date.getDate()}
        </span>
        {Months[date.getMonth()]}
      </h5>
      <div className={`${monthly ? 'flex' : ''}`}>
        <img
          className={`${
            monthly
              ? 'w-[48px] h-[48px] float-left mr-[16px]'
              : 'w-[70px] h-[70px]'
          } my-[4px]`}
          src={`${
            images.find(
              (weatherImage) =>
                weatherImage.weatherCode == weatherStateDaily.icon
            )?.image
          }`}
          alt=""
        />
        <div className="flex flex-col">
          <span className="text-[20px] after:content-['\00B0'] leading-tight">
            {numberWithSign(weatherStateDaily.tempmax)}
          </span>

          <span className="text-[#939cb0] text-[14px] after:content-['\00B0']">
            {numberWithSign(weatherStateDaily.tempmin)}
          </span>
        </div>
      </div>

      <span className={`${monthly ? 'hidden ' : ''}text-[#939cb0] text-[16px]`}>
        {weatherStateDaily.conditions}
      </span>
      <div
        className={`${
          date.getDay() == 0 && !monthly
            ? 'absolute border-[1px] h-[100%] right-[-5px] top-0 bg-white'
            : 'hidden'
        }`}
      ></div>
    </div>
  )
}

export default SmallDayState
