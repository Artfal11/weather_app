import { FC } from 'react'
import { WeatherStateHourly } from '../models/WeatherStateHourly'
import { images, wind_icon } from '../constants/constants'
import {
  arrayMax,
  arrayMin,
  numberWithSign,
  TimeOfDay,
  windDirection,
} from '../utils/utils'

interface TimeOfDayDetailProps {
  weatherStateHourlyArray: WeatherStateHourly[]
}

const TimeOfDayDetail: FC<TimeOfDayDetailProps> = ({
  weatherStateHourlyArray,
}) => {
  return (
    <tr>
      <td colSpan={1} className="py-[16px] w-[13%]">
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
      <td colSpan={1} className="w-[40px]">
        <img
          className="w-[40px] h-[40px]"
          src={`${
            images.find(
              (weatherImage) =>
                weatherImage.weatherCode == weatherStateHourlyArray[2].icon
            )?.image
          }`}
          alt=""
        />
      </td>
      <td colSpan={1} className="w-[20%]">
        <span>{weatherStateHourlyArray[2].conditions}</span>
      </td>
      <td colSpan={1}>
        {Math.round(weatherStateHourlyArray[2].pressure * 0.750062)}
      </td>
      <td colSpan={1}>{Math.round(weatherStateHourlyArray[2].humidity)}%</td>
      <td colSpan={1}>
        <div className="flex items-center gap-[4px]">
          {(weatherStateHourlyArray[2].windspeed / 3.6).toFixed(1)}{' '}
          <img
            src={wind_icon}
            className="w-[12px] h-[12px]"
            style={{ rotate: `${weatherStateHourlyArray[2].winddir}deg` }}
          />
          <span className="text-[12px]">
            {windDirection(weatherStateHourlyArray[2].winddir)}
          </span>
        </div>
      </td>
      <td colSpan={1} className="after:content-['\00B0']">
        {numberWithSign(weatherStateHourlyArray[2].feelslike)}
      </td>
    </tr>
  )
}

export default TimeOfDayDetail
