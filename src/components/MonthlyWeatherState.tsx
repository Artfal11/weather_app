import { useAppSelector } from '../hooks/redux'
import { weatherStateAPI } from '../services/WeatherStateService'
import SmallDayState from './SmallDayState'
import moment from 'moment'
import {
  numberWithSign,
  arrayAverage,
  windSpeed,
  windDirection,
  arrayMax,
  arraySum,
} from '../utils/utils'

import { blob, blobs, wind_icon, wind_image } from '../constants/constants'
import { FC, useState } from 'react'

import { Line, Pie } from 'react-chartjs-2'
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation'
import PlaceName from './PlaceName'

Chart.register(CategoryScale)
Chart.register(annotationPlugin)

interface MonthlyWeatherStateProps {
  className: string
}

const MonthlyWeatherState: FC<MonthlyWeatherStateProps> = ({ className }) => {
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

  const currentDay = LocationWeatherStates
    ? moment.tz(Date.now(), LocationWeatherStates.timezone).day()
    : moment(Date.now()).day()

  const startDay = (
    LocationWeatherStates
      ? moment.tz(Date.now(), LocationWeatherStates.timezone)
      : moment(Date.now())
  )
    .clone()
    .subtract(currentDay == 0 ? 6 : currentDay - 1, 'days')
    .format('YYYY-MM-DD')

  const endDay = (
    LocationWeatherStates
      ? moment.tz(Date.now(), LocationWeatherStates.timezone)
      : moment(Date.now())
  )
    .clone()
    .add(currentDay == 0 ? 28 : 35 - currentDay, 'days')
    .format('YYYY-MM-DD')

  const {
    data: DataRangeWeatherStates,
    isLoading,
    isError,
  } = weatherStateAPI.useFetchDataRangeQuery(
    {
      locationName: searchValue,
      startDay: startDay,
      endDay: endDay,
    },
    {
      skip: searchValue.length == 0,
    }
  )

  const daysFromNow = DataRangeWeatherStates?.days.slice(
    currentDay == 0 ? 6 : currentDay - 1,
    35
  )

  const tempLineChartData = {
    labels: daysFromNow
      ?.slice(0, 30)
      .map((day) => new Date(day.datetime).getDate()),

    datasets: [
      {
        label: 'Максимальная температура',
        data: daysFromNow
          ?.slice(0, 30)
          .map((day) => numberWithSign(day.tempmax)),
        borderColor: 'rgb(245, 66, 81)',
        backgroundColor: 'rgba(245, 66, 81, 0.2)',
        fill: '1',
        tension: 0.5,
      },
      {
        label: 'Минимальная температура',
        data: daysFromNow
          ?.slice(0, 30)
          .map((day) => numberWithSign(day.tempmin)),
        borderColor: 'rgb(66, 135, 245)',
        backgroundColor: 'rgba(66, 135, 245, 0.2)',
        fill: 'start',
        tension: 0.5,
      },
    ],
  }

  const humidityLineChartData = {
    labels: daysFromNow
      ?.slice(0, 30)
      .map((day) => new Date(day.datetime).getDate()),

    datasets: [
      {
        data: daysFromNow
          ?.slice(0, 30)
          .map((day) => numberWithSign(day.humidity)),
        borderColor: 'rgb(66, 135, 245)',
        backgroundColor: 'rgba(66, 135, 245, 0.2)',
        fill: 'start',
        tension: 0.5,
      },
    ],
  }

  const windSpeedLineChartData = {
    labels: daysFromNow
      ?.slice(0, 30)
      .map((day) => new Date(day.datetime).getDate()),

    datasets: [
      {
        data: daysFromNow
          ?.slice(0, 30)
          .map((day) => Number(windSpeed(day.windspeed))),
        borderColor: 'rgb(61, 199, 204)',
        backgroundColor: 'rgba(61, 199, 204, 0.2)',
        fill: 'start',
        tension: 0.5,
      },
    ],
  }

  const pressureLineChartData = {
    labels: daysFromNow
      ?.slice(0, 30)
      .map((day) => new Date(day.datetime).getDate()),

    datasets: [
      {
        data: daysFromNow
          ?.slice(0, 30)
          .map((day) => Math.round(day.pressure * 0.750062)),
        borderColor: 'rgb(139, 0, 255)',
        backgroundColor: 'rgba(139, 0, 255, 0.2)',
        fill: 'start',
        tension: 0.5,
      },
    ],
  }

  const pieChartData = {
    labels: ['ясных дней', 'дней с осадками', 'облачные дни'],
    datasets: [
      {
        data: [
          daysFromNow?.slice(0, 30).filter((day) => day.icon == 'clear-day')
            .length,
          daysFromNow
            ?.slice(0, 30)
            .filter(
              (day) =>
                day.icon == 'rain-snow-showers-day' ||
                day.icon == 'rain-snow' ||
                day.icon == 'rain' ||
                day.icon == 'showers-day' ||
                day.icon == 'sleet' ||
                day.icon == 'snow-showers-day' ||
                day.icon == 'snow' ||
                day.icon == 'thunder-rain' ||
                day.icon == 'thunder-showers-day' ||
                day.icon == 'thunder'
            ).length,
          daysFromNow
            ?.slice(0, 30)
            .filter(
              (day) => day.icon == 'cloudy' || day.icon == 'partly-cloudy-day'
            ).length,
        ],
        backgroundColor: [
          'rgb(255, 205, 86)',
          'rgb(54, 162, 235)',
          'rgb(61, 199, 204)',
        ],
      },
    ],
  }

  const tabsInfo = [
    {
      text: 'Температура',
      id: 'temp',
    },
    {
      text: 'Влажность, %',
      id: 'humidity',
    },
    {
      text: 'Ветер, м/c',
      id: 'windspeed',
    },
    {
      text: 'Давление, мм.рт.ст',
      id: 'pressure',
    },
  ]

  const [activeChart, setActiveChart] = useState(tabsInfo[0].id)

  const dataIsFull =
    DataRangeWeatherStates &&
    DataRangeWeatherStates.days.some(
      (day) => day.icon == '' && day.temp === null && day.conditions == ''
    )

  return (
    <div>
      {isLoading && <h1 className="container mx-auto">Загрузка...</h1>}
      {isError && <h1 className="container mx-auto">Произошла ошибка</h1>}
      {!isLoading && !isError && DataRangeWeatherStates && (
        <div
          className={`container mx-auto bg-white mt-[16px] rounded-[8px] md:rounded-0 py-[12px] px-[12px] lg:px-[24px] ${className}`}
        >
          <div className="mb-[16px] hidden md:block">
            <PlaceName isLarge={true} newText={': Погода на месяц'} />
            <span
              className={`text-red-500 text-[14px] font-normal ${
                dataIsFull ? 'block' : 'hidden'
              }`}
            >
              * Данные не удалось загрузить полностью
            </span>
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
                  {DataRangeWeatherStates?.days
                    .slice(0, currentDay == 0 ? 6 : currentDay - 1)
                    .map((day) => (
                      <td key={day.datetimeEpoch} className="opacity-40">
                        <SmallDayState weatherStateDaily={day} monthly={true} />
                      </td>
                    ))}
                  {DataRangeWeatherStates?.days
                    .slice(currentDay == 0 ? 6 : currentDay - 1, 7)
                    .map((day) => (
                      <td key={day.datetimeEpoch}>
                        <SmallDayState weatherStateDaily={day} monthly={true} />
                      </td>
                    ))}
                </tr>
                <tr className="border-b-[1px] border-[#e5e5e5]">
                  {DataRangeWeatherStates?.days.slice(7, 14).map((day) => (
                    <td key={day.datetimeEpoch}>
                      <SmallDayState weatherStateDaily={day} monthly={true} />
                    </td>
                  ))}
                </tr>
                <tr className="border-b-[1px] border-[#e5e5e5]">
                  {DataRangeWeatherStates?.days.slice(14, 21).map((day) => (
                    <td key={day.datetimeEpoch}>
                      <SmallDayState weatherStateDaily={day} monthly={true} />
                    </td>
                  ))}
                </tr>
                <tr className="border-b-[1px] border-[#e5e5e5]">
                  {DataRangeWeatherStates?.days.slice(21, 28).map((day) => (
                    <td key={day.datetimeEpoch}>
                      <SmallDayState weatherStateDaily={day} monthly={true} />
                    </td>
                  ))}
                </tr>
                <tr>
                  {DataRangeWeatherStates?.days.slice(28, 35).map((day) => (
                    <td key={day.datetimeEpoch}>
                      <SmallDayState weatherStateDaily={day} monthly={true} />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mb-[16px]">
            <h3 className="text-[24px] font-medium">
              В среднем за 30 дней
              <span
                className={`text-red-500 text-[14px] font-normal ${
                  dataIsFull ? 'block' : 'hidden'
                }`}
              >
                * Данные не удалось загрузить полностью
              </span>
            </h3>
            <div className="flex flex-col sm:flex-row items-left sm:items-center">
              <div className="h-[150px] w-[310px] 2xs:h-[200px] 2xs:w-[350px] flex items-start border-r-[1px] border-[#fff] sm:border-[#e5e5e5] pr-[32px] mr-[32px]">
                <Pie
                  data={pieChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: true,
                        position: 'right',
                        labels: {
                          usePointStyle: true,
                          generateLabels: function (chart) {
                            return [
                              {
                                text:
                                  chart.data.datasets[0].data[0] +
                                  ' - ясных дней',
                                fillStyle: 'rgb(255, 205, 86)',
                                pointStyle: 'circle',
                              },
                              {
                                text:
                                  chart.data.datasets[0].data[1] +
                                  ' - дней с осадками',
                                fillStyle: 'rgb(54, 162, 235)',
                                pointStyle: 'circle',
                              },
                              {
                                text:
                                  chart.data.datasets[0].data[2] +
                                  ' - облачные дни',
                                fillStyle: 'rgb(61, 199, 204)',
                                pointStyle: 'circle',
                              },
                            ]
                          },
                        },
                      },
                    },
                  }}
                />
              </div>
              {daysFromNow && (
                <div className="flex flex-col xs:flex-row sm:flex-col gap-0 2xs:gap-[16px] lg:flex-row lg:gap-0">
                  <div className="flex flex-col gap-0 2xs:gap-[16px] mr-[24px]">
                    <div className="flex items-center">
                      <img
                        src={blob}
                        className="w-[48px] h-[48px] mr-[6px] 2xs:w-[56px] 2xs:h-[56px] 2xs:mr-[12px]"
                      />
                      <span className="text-[36px] 2xs:text-[44px] mr-[8px]">
                        {arrayAverage(
                          daysFromNow?.slice(0, 30).map((d) => d.humidity)
                        ).toFixed(0)}
                      </span>
                      <span className="text-[#939cb0] flex flex-col gap-[-5px]">
                        <span>%</span>
                        <span>влажность воздуха</span>
                      </span>
                    </div>
                    <div className="flex items-center">
                      <img
                        src={wind_image}
                        className="w-[48px] h-[48px] mr-[6px] 2xs:w-[56px] 2xs:h-[56px] 2xs:mr-[12px]"
                      />
                      <span className="text-[36px] 2xs:text-[44px] mr-[8px]">
                        {windSpeed(
                          arrayAverage(
                            daysFromNow.slice(0, 30).map((d) => d.windspeed)
                          )
                        )}
                      </span>
                      <span className="text-[#939cb0] flex flex-col gap-[-5px]">
                        <span>м/c</span>
                        <span className="flex items-center gap-[4px]">
                          ветер{' '}
                          <img
                            src={wind_icon}
                            className="w-[14px] h-[14px]"
                            style={{
                              rotate: `${
                                180 +
                                arrayAverage(
                                  daysFromNow.slice(0, 30).map((d) => d.winddir)
                                )
                              }deg`,
                            }}
                          />
                          {windDirection(
                            arrayAverage(
                              daysFromNow.slice(0, 30).map((d) => d.winddir)
                            )
                          )}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <img
                        src={blobs}
                        className="w-[48px] h-[48px] mr-[6px] 2xs:w-[56px] 2xs:h-[56px] 2xs:mr-[12px]"
                      />
                      <span className="text-[36px] 2xs:text-[44px] mr-[8px]">
                        {(
                          arraySum(
                            daysFromNow?.slice(0, 30).map((day) => day.precip)
                          ) / 7
                        ).toFixed(0)}
                      </span>
                      <span className="text-[#939cb0] flex flex-col gap-[-5px]">
                        <span>мм</span>
                        <span>осадков</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-[24px] font-medium mb-[16px]">
              Прогноз на графиках
              <span
                className={`text-red-500 text-[14px] font-normal ${
                  dataIsFull ? 'block' : 'hidden'
                }`}
              >
                * Данные не удалось загрузить полностью
              </span>
            </h3>

            <div className="inline-flex bg-[#f0f0f0] rounded-[18px] items-center mb-[16px]">
              {tabsInfo.map((tab) => (
                <button
                  key={tab.id}
                  className={`${
                    activeChart == tab.id ? 'bg-[#fd5] ' : ''
                  }py-[8px] px-[12px] 2xs:px-[16px] rounded-[18px] ${
                    tab.text == 'Давление, мм.рт.ст'
                      ? 'hidden 2xs:inline-block'
                      : ''
                  }`}
                  onClick={() => setActiveChart(tab.id)}
                >
                  <span>{tab.text.split(', ')[0]}</span>
                  <span className="hidden xs:inline">
                    {tab.text.split(', ').length == 2 ? ', ' : ''}
                    {tab.text.split(', ')[1]}
                  </span>
                </button>
              ))}
            </div>

            <div
              className={`${
                activeChart == tabsInfo[0].id ? '' : 'hidden '
              }h-[250px] xs:h-[300px] w-[100%]`}
            >
              <Line
                data={tempLineChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                    y: {
                      ticks: {
                        callback: (val) => {
                          return numberWithSign(Number(val)) + '°'
                        },
                        display: true,
                        stepSize: 4,
                      },
                    },
                  },
                }}
              />
            </div>

            <div
              className={`${
                activeChart == tabsInfo[1].id ? '' : 'hidden '
              }h-[200px] xs:h-[300px] w-[100%]`}
            >
              <Line
                data={humidityLineChartData}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      enabled: false,
                    },
                    annotation: {
                      annotations: daysFromNow
                        ?.slice(0, 30)
                        .map((day, index) => ({
                          type: 'label',
                          xValue: index,
                          yValue: numberWithSign(day.humidity),
                          content: [
                            window.innerWidth < 590
                              ? index % 2 == 0
                                ? Math.floor(day.humidity).toString()
                                : ''
                              : Math.floor(day.humidity).toString(),
                          ],
                          color: 'rgb(66, 135, 245)',
                          font: {
                            size: 12,
                            weight: 'bold',
                          },
                          yAdjust: -20,
                          xAdjust: index == 0 ? 6 : index == 29 ? -6 : 0,
                        })),
                    },
                  },
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                    y: {
                      max:
                        daysFromNow &&
                        arrayMax(daysFromNow.map((day) => day.humidity)) + 5,
                      grid: {
                        display: false,
                      },
                      ticks: {
                        display: false,
                        stepSize: 4,
                      },
                    },
                  },
                }}
              />
            </div>

            <div
              className={`${
                activeChart == tabsInfo[2].id ? '' : 'hidden '
              }h-[200px] xs:h-[300px] w-[100%]`}
            >
              <Line
                data={windSpeedLineChartData}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      enabled: false,
                    },
                    annotation: {
                      annotations: daysFromNow
                        ?.slice(0, 30)
                        .map((day, index) => ({
                          type: 'label',
                          xValue: index,
                          yValue: Number(windSpeed(day.windspeed)),
                          content: [
                            window.innerWidth < 590
                              ? index % 2 == 0
                                ? Number(windSpeed(day.windspeed)).toString()
                                : ''
                              : Number(windSpeed(day.windspeed)).toString(),
                          ],
                          color: 'rgb(61, 199, 204)',
                          font: {
                            size: 12,
                            weight: 'bold',
                          },
                          yAdjust: -20,
                          xAdjust: index == 0 ? 8 : index == 29 ? -8 : 0,
                        })),
                    },
                  },
                  responsive: true,
                  maintainAspectRatio: false,

                  scales: {
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                    y: {
                      max:
                        daysFromNow &&
                        arrayMax(
                          daysFromNow.map((day) =>
                            Number(windSpeed(day.windspeed))
                          )
                        ) + 3,
                      grid: {
                        display: false,
                      },
                      ticks: {
                        display: false,
                        stepSize: 2,
                      },
                    },
                  },
                }}
              />
            </div>

            <div
              className={`${
                activeChart == tabsInfo[3].id ? '' : 'hidden '
              }h-[200px] xs:h-[300px] w-[100%]`}
            >
              <Line
                data={pressureLineChartData}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      enabled: false,
                    },
                    annotation: {
                      annotations: daysFromNow
                        ?.slice(0, 30)
                        .map((day, index) => ({
                          type: 'label',
                          xValue: index,
                          yValue: Math.round(day.pressure * 0.750062),
                          content: [
                            window.innerWidth < 590
                              ? index % 2 == 0
                                ? Math.round(day.pressure * 0.750062).toString()
                                : ''
                              : Math.round(day.pressure * 0.750062).toString(),
                          ],
                          color: 'rgb(139, 0, 255)',
                          font: {
                            size: 12,
                            weight: 'bold',
                          },
                          yAdjust: -20,
                          xAdjust: index == 0 ? 10 : index == 29 ? -10 : 0,
                        })),
                    },
                  },
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                    y: {
                      max:
                        daysFromNow &&
                        arrayMax(
                          daysFromNow.map((day) =>
                            Math.round(day.pressure * 0.750062)
                          )
                        ) + 5,
                      grid: {
                        display: false,
                      },
                      ticks: {
                        display: false,
                        stepSize: 4,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MonthlyWeatherState
