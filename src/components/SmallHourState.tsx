import { FC } from 'react'
import { WeatherStateHourly } from '../models/WeatherStateHourly'
import { images } from '../constants/constants'
import { numberWithSign } from '../utils/utils'

interface SmallHourStateProps {
  weatherStateHourly: WeatherStateHourly
}

const SmallHourState: FC<SmallHourStateProps> = ({ weatherStateHourly }) => {
  return (
    <div className="flex flex-col items-center">
      <span>{weatherStateHourly.datetime.slice(0, 5)}</span>
      <img
        className="w-[24px] h-[24px]"
        src={`${
          images.find(
            (weatherImage) =>
              weatherImage.weatherCode == weatherStateHourly.icon
          )?.image
        }`}
        alt=""
      />
      <span className="after:content-['\00B0']">
        {numberWithSign(weatherStateHourly.temp)}
      </span>
      <div
        className={`${
          weatherStateHourly.datetime.includes('23:00')
            ? 'absolute border-[1px] h-[100%] right-[-15px] top-0 bg-white opacity-30'
            : 'hidden'
        }`}
      ></div>
    </div>
  )
}

export default SmallHourState
