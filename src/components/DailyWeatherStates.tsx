import { useAppSelector } from '../hooks/redux'
import { weatherStateAPI } from '../services/WeatherStateService'
import SmallDayState from './SmallDayState'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'

const DailyWeatherStates = () => {
  const { searchValue } = useAppSelector((state) => state.searchReducer)
  const { data: LocationWeatherStates } =
    weatherStateAPI.useFetchForecastWeatherStatesQuery({
      locationName: searchValue,
    })

  return (
    <div>
      {LocationWeatherStates && (
        <div className="relative select-none swiper-days bg-white rounded-[8px] py-[8px] mb-[16px]">
          <h2 className="text-[24px] font-bold mb-[8px] w-[95%] mx-auto">
            Прогноз на 2 недели
          </h2>
          <Swiper
            className="mySwiper w-[94%]"
            modules={[Navigation]}
            spaceBetween={30}
            slidesPerGroupSkip={0}
            navigation={{
              prevEl: '.prev-daily',
              nextEl: '.next-daily',
            }}
            breakpoints={{
              320: {
                slidesPerView: 2,
              },
              475: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 5,
                slidesPerGroup: 2,
              },
              1280: {
                slidesPerView: 7,
                slidesPerGroup: 3,
              },
            }}
          >
            {LocationWeatherStates?.days.map((weatherState) => (
              <SwiperSlide
                className="flex justify-center"
                key={weatherState?.datetimeEpoch}
              >
                <SmallDayState
                  weatherStateDaily={weatherState}
                  monthly={false}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] absolute prev-daily w-[36px] h-[36px] rounded-[50%] bg-[rgba(255,255,255,0.4)] cursor-pointer top-[50%] left-0 translate-y-[-50%] z-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#000"
              className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]"
              viewBox="0 0 16 16"
            >
              <path d="M10 12.796V3.204L4.519 8zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753" />
            </svg>
          </div>
          <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] absolute next-daily w-[36px] h-[36px] rounded-[50%] bg-[rgba(255,255,255,0.4)] cursor-pointer top-[50%] right-0 translate-y-[-50%] z-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#000"
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

export default DailyWeatherStates
