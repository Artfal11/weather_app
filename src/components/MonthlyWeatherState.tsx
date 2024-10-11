import { useAppSelector } from '../hooks/redux'
import { weatherStateAPI } from '../services/WeatherStateService'
import { citiesAPI } from '../services/CitiesService'
import SmallDayState from './SmallDayState'
import moment from 'moment'

const MonthlyWeatherState = () => {
  const { searchValue } = useAppSelector((state) => state.searchReducer)
  const { data: LocationWeatherStates } =
    weatherStateAPI.useFetchForecastWeatherStatesQuery(
      {
        locationName: searchValue,
      },
      {
        skip: searchValue.length == 0,
      }
    )

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

  const currentDay = moment(
    LocationWeatherStates && LocationWeatherStates.days[0].datetime
  ).day()

  const { data: LastFewDays } = weatherStateAPI.useFetchLastFewDaysQuery(
    {
      locationName: searchValue,
      days: currentDay - 1 - 1,
    },
    {
      skip: searchValue.length == 0,
    }
  )

  const startDay = moment(
    LocationWeatherStates && LocationWeatherStates.days[0].datetime
  )
    .clone()
    .add(15, 'days')
    .format('YYYY-MM-DD')

  const endDay = moment(
    LocationWeatherStates && LocationWeatherStates.days[0].datetime
  )
    .clone()
    .add(35 - currentDay, 'days')
    .format('YYYY-MM-DD')

  const { data: nextDays } = weatherStateAPI.useFetchDataRangeQuery({
    locationName: searchValue,
    startDay: startDay,
    endDay: endDay,
  })

  return (
    <div className="container mx-auto bg-white pt-[12px] px-[24px]">
      <h1 className="text-[24px] font-bold">
        {isLoading && <span>Загрузка...</span>}
        {isError && <span>Произошла ошибка при загрузке</span>}
        {placeName &&
        !isLoading &&
        !isError &&
        LocationWeatherStates &&
        regex.test(LocationWeatherStates?.resolvedAddress)
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
          : LocationWeatherStates?.resolvedAddress.split(', ')[0] +
            ', ' +
            LocationWeatherStates?.resolvedAddress.split(', ')[1]}
        : Погода на месяц
      </h1>
      <table className="w-[100%]" cellPadding={10}>
        <thead>
          <tr className="text-left border-b-[1px] border-[#e5e5e5]">
            <th className="font-normal">Пн</th>
            <th className="font-normal">Вт</th>
            <th className="font-normal">Ср</th>
            <th className="font-normal">Чт</th>
            <th className="font-normal">Пт</th>
            <th className="font-normal">Сб</th>
            <th className="font-normal">Вс</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b-[1px] border-[#e5e5e5]">
            {LastFewDays?.days.map((day) => (
              <td key={day.datetimeEpoch} className="opacity-40">
                <SmallDayState weatherStateDaily={day} monthly={true} />
              </td>
            ))}
            {LocationWeatherStates?.days
              .slice(0, 7 - (currentDay - 1))
              .map((day) => (
                <td key={day.datetimeEpoch}>
                  <SmallDayState weatherStateDaily={day} monthly={true} />
                </td>
              ))}
          </tr>
          <tr className="border-b-[1px] border-[#e5e5e5]">
            {LocationWeatherStates?.days
              .slice(7 - (currentDay - 1), 7 - (currentDay - 1) + 7)
              .map((day) => (
                <td key={day.datetimeEpoch}>
                  <SmallDayState weatherStateDaily={day} monthly={true} />
                </td>
              ))}
          </tr>
          <tr className="border-b-[1px] border-[#e5e5e5]">
            {LocationWeatherStates?.days
              .slice(7 - (currentDay - 1) + 7, 7 - (currentDay - 1) + 14)
              .map((day) => (
                <td key={day.datetimeEpoch}>
                  <SmallDayState weatherStateDaily={day} monthly={true} />
                </td>
              ))}
            {nextDays?.days.slice(0, 7 - currentDay).map((day) => (
              <td key={day.datetimeEpoch}>
                <SmallDayState weatherStateDaily={day} monthly={true} />
              </td>
            ))}
          </tr>
          <tr className="border-b-[1px] border-[#e5e5e5]">
            {nextDays?.days
              .slice(7 - currentDay, 7 - currentDay + 7)
              .map((day) => (
                <td key={day.datetimeEpoch}>
                  <SmallDayState weatherStateDaily={day} monthly={true} />
                </td>
              ))}
          </tr>
          <tr>
            {nextDays?.days
              .slice(7 - currentDay + 7, 7 - currentDay + 14)
              .map((day) => (
                <td key={day.datetimeEpoch}>
                  <SmallDayState weatherStateDaily={day} monthly={true} />
                </td>
              ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default MonthlyWeatherState
