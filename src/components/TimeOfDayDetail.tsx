import { FC } from 'react'
import { WeatherStateHourly } from '../models/WeatherStateHourly'
import { images, wind_icon } from '../constants/constants'
import {
  arrayMax,
  arrayMin,
  numberWithSign,
  TimeOfDay,
  windDirection,
  windSpeed,
} from '../utils/utils'

interface TimeOfDayDetailProps {
  weatherStateHourlyArray: WeatherStateHourly[]
}

const TimeOfDayDetail: FC<TimeOfDayDetailProps> = ({
  weatherStateHourlyArray,
}) => {
  return (
    <tr>
      <td colSpan={1} className="py-[8px] xs:py-[16px] w-[13%]">
        <span className="block text-[12px] text-[#939cb0]">
          {TimeOfDay(weatherStateHourlyArray[0].datetime)}
        </span>
        <span className="after:content-['\00B0'] text-[16px] font-medium">
          {numberWithSign(arrayMin(weatherStateHourlyArray.map((w) => w.temp)))}
        </span>
        ...
        <span className="after:content-['\00B0'] text-[16px] font-medium">
          {numberWithSign(arrayMax(weatherStateHourlyArray.map((w) => w.temp)))}
        </span>
      </td>
      <td colSpan={1} className="w-[25%] xs:w-[40px] text-center xs:text-left">
        <img
          className="w-[40px] h-[40px] inline"
          src={`${
            images.find(
              (weatherImage) =>
                weatherImage.weatherCode == weatherStateHourlyArray[2].icon
            )?.image
          }`}
          alt=""
        />
      </td>
      <td colSpan={1} className="w-0 md:w-[20%]">
        <span className="hidden md:inline">
          {weatherStateHourlyArray[2].conditions}
        </span>
      </td>
      <td colSpan={1} className="hidden sm:table-cell">
        {Math.round(weatherStateHourlyArray[2].pressure * 0.750062)}
      </td>
      <td colSpan={1} className="hidden xs:table-cell">
        {Math.round(weatherStateHourlyArray[2].humidity)}%
      </td>
      <td colSpan={1} className="table-cell">
        <div className="flex items-center gap-[4px]">
          {windSpeed(weatherStateHourlyArray[2].windspeed)}{' '}
          <img
            src={wind_icon}
            className="w-[12px] h-[12px]"
            style={{ rotate: `${180 + weatherStateHourlyArray[2].winddir}deg` }}
          />
          <span className="text-[12px]">
            {windDirection(weatherStateHourlyArray[2].winddir)}
          </span>
        </div>
      </td>
      <td
        colSpan={1}
        className="after:content-['\00B0'] text-center xs:text-left"
      >
        {numberWithSign(weatherStateHourlyArray[2].feelslike)}
      </td>
    </tr>
  )
}

export default TimeOfDayDetail
