import { Link } from 'react-router-dom'
import SearchInput from './SearchInput'

const Header = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto flex h-[60px] items-center justify-between">
        <Link to="/" className="font-medium flex items-center text-[24px]">
          <span className="flex justify-center bg-green-700 text-white text-[18px] w-[26px] h-[26px] rounded-[50%] mr-[1px]">
            И
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 26 26"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-amber-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
            />
          </svg>
          Погода
        </Link>
        <div className="flex space-x-6">
          <Link to="/month">Прогноз на месяц</Link>
        </div>

        <SearchInput />
      </div>
    </div>
  )
}

export default Header
