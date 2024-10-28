import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { popupSlice } from '../store/reducers/PopupSlice'

const Popup = () => {
  const { popupVisible } = useAppSelector((state) => state.popupReducer)
  const { makeInvisible } = popupSlice.actions
  const dispatch = useAppDispatch()

  return (
    <div
      className={`${
        popupVisible ? 'flex ' : 'hidden '
      }absolute left-0 top-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.5)] items-center justify-center z-10`}
    >
      <div className="bg-white p-[16px] rounded-[8px] w-[420px] text-center">
        <h2 className="mb-[8px]">
          Вы запретили сайту доступ к геоданным. В связи с этим текущее
          местоположение может быть найдено неверно. Разрешите доступ или
          введите ваше местоположение вручную через поиск
        </h2>
        <button
          className="bg-[#fd5] py-[8px] px-[16px] rounded-[18px]"
          onClick={() => dispatch(makeInvisible())}
        >
          Хорошо
        </button>
      </div>
    </div>
  )
}

export default Popup
