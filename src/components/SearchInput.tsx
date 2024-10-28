import { useAppDispatch } from '../hooks/redux'
import { searchSlice } from '../store/reducers/SearchSlice'
import { useEffect, useState } from 'react'
import { useDebounce } from '../hooks/debounce'
import { citiesAPI } from '../services/CitiesService'
import { Suggestion } from '../models/Suggestion'

const SearchInput = () => {
  const [localSearchValue, setLocalSearchValue] = useState('')
  const debounced = useDebounce(localSearchValue)
  const { change } = searchSlice.actions
  const dispatch = useAppDispatch()

  const { data: suggestions } = citiesAPI.useFetchSuggestionsQuery(debounced, {
    skip: debounced.length == 0,
  })

  const [errorMessage, setErrorMessage] = useState('')

  const filteredSuggestions = suggestions?.suggestions.filter(
    (sug) =>
      (sug.data.geo_lat && sug.data.geo_lon) ||
      (sug.data.region &&
        sug.data.area === null &&
        sug.data.city === null &&
        sug.data.settlement === null)
  )

  const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (filteredSuggestions && filteredSuggestions?.length > 0) {
      setErrorMessage('Выберите населенный пункт ниже')
    }
  }

  const handleClear = () => {
    setLocalSearchValue('')
  }

  const selectSuggestion = (sug: Suggestion) => {
    if (
      sug.data.region &&
      sug.data.area === null &&
      sug.data.city === null &&
      sug.data.settlement === null
    ) {
      setLocalSearchValue(sug.data.region_with_type)
    }
    if (sug.data.geo_lat && sug.data.geo_lon) {
      dispatch(change(sug.data.geo_lat + ', ' + sug.data.geo_lon))
      setLocalSearchValue('')
      setErrorMessage('')
    }
  }

  useEffect(() => {
    if (filteredSuggestions?.length == 0 && debounced.length > 0) {
      setErrorMessage('Введите корректное значение')
    } else {
      setErrorMessage('')
    }
  }, [suggestions, debounced])

  return (
    <form
      className="relative w-[55%] 3xs:w-[50%] md:w-[33%] lg:w-[25%] flex items-center justify-between bg-[#eceef2] h-[36px] rounded-[5px] text-[16px] px-[12px]"
      onSubmit={handleSumbit}
    >
      <span
        className={`absolute text-red-500 left-[10px] top-[-16px] text-[14px] hidden xs:inline ${
          errorMessage ? 'block' : 'hidden'
        }`}
      >
        {errorMessage}
      </span>
      <span
        className={`absolute text-red-500 left-[10px] top-[-16px] text-[14px] inline xs:hidden ${
          errorMessage ? 'block' : 'hidden'
        }`}
      >
        Ошибка ввода
      </span>
      <input
        className="bg-transparent outline-0 w-full"
        type="text"
        placeholder="Город или район"
        onChange={(e) => setLocalSearchValue(e.target.value)}
        value={localSearchValue}
      />
      <span className="flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`size-6 text-gray-400 ${
            localSearchValue === '' ? 'block' : 'hidden'
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`size-6 text-gray-400 cursor-pointer ${
            localSearchValue === '' ? 'hidden' : 'block'
          }`}
          onClick={handleClear}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </span>

      <ul
        className={`${
          localSearchValue.length == 0 ? 'hidden ' : ''
        }list-none absolute top-[36px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white z-10`}
      >
        {filteredSuggestions
          ?.filter((sug) => sug.value !== localSearchValue)
          .map((suggestion) => (
            <li
              key={suggestion.value}
              onClick={() => selectSuggestion(suggestion)}
              className="text-[14px] py-1 px-2 hover:bg-[#fcd372] transition-colors cursor-pointer"
            >
              {(suggestion.data.region &&
                suggestion.data.settlement &&
                suggestion.data.settlement_with_type +
                  ', ' +
                  suggestion.data.region_with_type) ||
                (suggestion.data.region &&
                  suggestion.data.city &&
                  suggestion.data.city != suggestion.data.region &&
                  suggestion.data.city_with_type +
                    ', ' +
                    suggestion.data.region_with_type) ||
                (suggestion.data.region && suggestion.data.region_with_type) ||
                (suggestion.data.region &&
                  suggestion.data.area &&
                  suggestion.data.area_with_type +
                    ', ' +
                    suggestion.data.region_with_type)}
            </li>
          ))}
      </ul>
    </form>
  )
}

export default SearchInput
