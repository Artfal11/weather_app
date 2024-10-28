import moment from 'moment'
import { earth, moon_bg, suncard_bg } from '../constants/constants'

import { moonPhaseToString, uvIndexToString } from '../utils/utils'
import { WeatherStateDaily } from '../models/WeatherStateDaily'
import { FC } from 'react'

interface SunCardProps {
  weatherStateDaily: WeatherStateDaily
  isVisible: boolean
}

const SunCard: FC<SunCardProps> = ({ weatherStateDaily, isVisible }) => {
  return (
    <div className="hidden xl:block bg-white rounded-[8px] w-[25%] m-0 py-[16px]">
      <div className="mx-auto text-center flex flex-col mb-[16px]">
        <span className="text-[16px]">Световой день</span>
        <span className="text-[18px] font-bold leading-[0.75]">
          {moment(
            moment
              .unix(weatherStateDaily.sunsetEpoch)
              .format('YYYY-MM-DD HH:mm')
          ).diff(
            moment(
              moment
                .unix(weatherStateDaily.sunriseEpoch)
                .format('YYYY-MM-DD HH:mm')
            ),
            'hours'
          )}{' '}
          ч{' '}
          {Number(
            moment(
              moment
                .unix(weatherStateDaily.sunsetEpoch)
                .format('YYYY-MM-DD HH:mm')
            ).diff(
              moment(
                moment
                  .unix(weatherStateDaily.sunriseEpoch)
                  .format('YYYY-MM-DD HH:mm')
              ),
              'minutes'
            )
          ) % 60}{' '}
          мин
        </span>
        <div
          className="h-[107px] w-[100%] bg-no-repeat bg-center"
          style={{ backgroundImage: `url('${suncard_bg}')` }}
        ></div>
        <div className="flex justify-around text-[16px]">
          <span className="ml-[-20%]">
            {weatherStateDaily.sunrise.slice(0, 5)}
          </span>
          <span className="mr-[-20%]">
            {weatherStateDaily.sunset.slice(0, 5)}
          </span>
        </div>
      </div>
      <div
        className={`${
          isVisible ? 'flex ' : 'hidden'
        } relative h-[135px] w-[156px] bg-no-repeat bg-center mt-[-88px] mb-[16px] mx-auto justify-center items-center`}
        style={{ backgroundImage: `url('${moon_bg}')` }}
      >
        <img src={`${earth}`} />
        <div
          className="absolute w-[30px] h-[30px] bg-slate-600 overflow-hidden rounded-[50%] z-4"
          style={{
            left: `${moonPhaseToString(weatherStateDaily.moonphase).left}`,
            top: `${moonPhaseToString(weatherStateDaily.moonphase).top}`,
            transform: `translate(${
              moonPhaseToString(weatherStateDaily.moonphase).transLeft
            }, ${moonPhaseToString(weatherStateDaily.moonphase).transTop}`,
          }}
        >
          <div
            className={`absolute h-[30px] bg-white left-0 top-0 rounded-[50%] z-5`}
            style={{
              width: `${
                weatherStateDaily.moonphase <= 0.5
                  ? weatherStateDaily.moonphase == 0
                    ? 100
                    : weatherStateDaily.moonphase * 2 * 100
                  : (1 - (weatherStateDaily.moonphase - 0.5) * 2) * 100
              }%`,
            }}
          ></div>
        </div>
      </div>
      <div className="text-[16px] text-[#222426] text-center flex flex-col">
        <div className="flex items-center justify-center">
          <div
            className={`${
              isVisible ? 'hidden ' : 'block'
            } relative w-[30px] h-[30px] bg-slate-600 overflow-hidden rounded-[50%] z-4 mr-[16px]`}
          >
            <div
              className={`absolute h-[30px] bg-white left-0 top-0 rounded-[50%] z-5`}
              style={{
                width: `${
                  weatherStateDaily.moonphase <= 0.5
                    ? weatherStateDaily.moonphase == 0
                      ? 100
                      : weatherStateDaily.moonphase * 2 * 100
                    : weatherStateDaily.moonphase == 1
                    ? 0
                    : (1 - (weatherStateDaily.moonphase - 0.5) * 2) * 100
                }%`,
              }}
            ></div>
          </div>
          <span>{moonPhaseToString(weatherStateDaily.moonphase).string}</span>
        </div>
        <span className={`${isVisible ? 'inline ' : 'hidden'}`}>
          {uvIndexToString(weatherStateDaily.moonphase)}
        </span>
      </div>
    </div>
  )
}

export default SunCard
