import { FC } from 'react'
import { WeatherStateDaily } from '../models/WeatherStateDaily'
import { weatherStateAPI } from '../services/WeatherStateService'
import { useAppSelector } from '../hooks/redux'
import { getCurrentTime, uvIndexToString } from '../utils/utils'
import { DaysOfWeek } from '../models/DaysOfWeek'
import { Months } from '../models/Months'
import TimeOfDayDetail from './TimeOfDayDetail'
import SunCard from './SunCard'

interface DayDetailProps {
  weatherState: WeatherStateDaily
}

const DayDetail: FC<DayDetailProps> = ({ weatherState }) => {
  const { searchValue } = useAppSelector((state) => state.searchReducer)
  const { data: LocationWeatherStates } =
    weatherStateAPI.useFetchForecastWeatherStatesQuery({
      locationName: searchValue,
    })

  let date = new Date(weatherState.datetime)
  return (
    <div className="flex items-center w-[100%] bg-white rounded-[8px] px-[8px] 2xs:px-[24px] py-[8px] 2xs:py-[12px]">
      <table className="w-[100%] xl:w-[69%]">
        <thead className="border-b-[1px] border-[#e5e5e5]">
          <tr>
            <th
              colSpan={2}
              className="w-[28%] 3xs:w-[38%] xs:w-[28%] md:w-[22%]"
            ></th>
            <th colSpan={1}></th>
            <th colSpan={1}></th>
            <th colSpan={1}></th>
            <th colSpan={1}></th>
            <th colSpan={1}></th>
          </tr>
          <tr>
            <th colSpan={2}>
              <div
                className={`flex text-left font-normal${
                  date.getDay() == 0 || date.getDay() == 6
                    ? ' text-[#f66049]'
                    : ''
                }`}
              >
                <h1 className="text-[56px] mr-[16px] 2xs:mr-[32px] leading-[1]">
                  {date.getDate()}
                </h1>
                <div className="flex flex-col">
                  <span>{Months[date.getMonth()]},</span>
                  <span>
                    {LocationWeatherStates &&
                    getCurrentTime(LocationWeatherStates)?.date() ==
                      date.getDate() &&
                    getCurrentTime(LocationWeatherStates)?.month() ==
                      date.getMonth()
                      ? 'Сегодня'
                      : DaysOfWeek[date.getDay()]}
                  </span>
                </div>
              </div>
            </th>
            <th></th>
            <th className="text-left text-[#939cb0] font-normal hidden sm:table-cell">
              Давление, <br /> мм.рт.ст
            </th>
            <th className="text-left text-[#939cb0] font-normal hidden xs:table-cell">
              Влажность
            </th>
            <th className="text-left text-[#939cb0] font-normal table-cell">
              Ветер<span className="hidden 2xs:inline">, м/c</span>
            </th>
            <th className="text-left text-[#939cb0] font-normal">
              Ощущается <span className="hidden 2xs:inline">как</span>
            </th>
          </tr>
        </thead>
        <tbody className="border-b-[1px] border-[#e5e5e5]">
          <TimeOfDayDetail
            weatherStateHourlyArray={weatherState.hours.slice(5, 12)}
          />
          <TimeOfDayDetail
            weatherStateHourlyArray={weatherState.hours.slice(12, 17)}
          />
          <TimeOfDayDetail
            weatherStateHourlyArray={weatherState.hours.slice(17, 22)}
          />
          <TimeOfDayDetail
            weatherStateHourlyArray={weatherState.hours.slice(21, 24)}
          />
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4}>
              <div className="py-[8px]">
                {uvIndexToString(weatherState.uvindex)}, {weatherState.uvindex}
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
      <SunCard weatherStateDaily={weatherState} isVisible={false} />
    </div>
  )
}

export default DayDetail
