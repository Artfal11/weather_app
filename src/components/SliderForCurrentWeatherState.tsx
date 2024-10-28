import { useAppSelector } from '../hooks/redux'
import { weatherStateAPI } from '../services/WeatherStateService'
import SmallHourState from './SmallHourState'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'

const SliderForCurrentWeatherState = () => {
  const { searchValue } = useAppSelector((state) => state.searchReducer)

  const { data: LocationWeatherStates } =
    weatherStateAPI.useFetchForecastWeatherStatesQuery({
      locationName: searchValue,
    })
  return (
    <div>
      {LocationWeatherStates && (
        <div className="relative select-none">
          <Swiper
            className="mySwiper w-[91%]"
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerGroupSkip={0}
            slidesPerGroup={2}
            navigation={{
              prevEl: '.prev-hourly',
              nextEl: '.next-hourly',
            }}
            breakpoints={{
              320: {
                slidesPerView: 4,
              },
              420: {
                slidesPerView: 5,
              },
              590: {
                slidesPerView: 7,
              },
              768: {
                slidesPerView: 5,
              },
              1024: {
                slidesPerView: 7,
                slidesPerGroup: 3,
              },
            }}
          >
            {LocationWeatherStates.days.slice(0, 2).map((day) =>
              day.hours
                .filter(
                  (hour) =>
                    hour.datetimeEpoch * 1000 > Date.now() - 3_600_000 &&
                    hour.datetimeEpoch * 1000 < Date.now() + 3_600_000 * 24
                )
                .map((hour) => (
                  <SwiperSlide>
                    <SmallHourState
                      weatherStateHourly={hour}
                      key={hour.datetime}
                    />
                  </SwiperSlide>
                ))
            )}
          </Swiper>
          <div className="absolute prev-hourly w-[28px] h-[28px] rounded-[50%] bg-[rgba(255,255,255,0.4)] cursor-pointer top-[50%] left-[-10px] translate-y-[-50%]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#fff"
              className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]"
              viewBox="0 0 16 16"
            >
              <path d="M10 12.796V3.204L4.519 8zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753" />
            </svg>
          </div>
          <div className="absolute next-hourly w-[28px] h-[28px] rounded-[50%] bg-[rgba(255,255,255,0.4)] cursor-pointer top-[50%] right-[-10px] translate-y-[-50%]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]"
              viewBox="0 0 16 16"
            >
              <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753" />
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}

export default SliderForCurrentWeatherState
