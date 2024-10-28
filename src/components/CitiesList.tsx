import { cities } from '../constants/constants'

import CitiesListItem from './CitiesListItem'

const CitiesList = () => {
  return (
    <div className="hidden md:block w-[35%] xl:w-[23%] bg-white p-[16px] rounded-[8px] w-[23%]">
      <h3 className="text-[18px] font-medium">Погода в других городах</h3>
      <ul>
        {cities?.map((city) => (
          <CitiesListItem cityName={city.cityName} key={city.cityName} />
        ))}
      </ul>
    </div>
  )
}

export default CitiesList
