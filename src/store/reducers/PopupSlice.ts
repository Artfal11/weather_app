import { createSlice } from '@reduxjs/toolkit'

interface PopupState {
  popupVisible: boolean
}

const initialState: PopupState = {
  popupVisible: false,
}

export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    makeVisible(state) {
      state.popupVisible = true
    },
    makeInvisible(state) {
      state.popupVisible = false
    },
  },
})

export default popupSlice.reducer
