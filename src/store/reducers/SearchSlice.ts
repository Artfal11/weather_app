import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SearchState {
  searchValue: string
}

const initialState: SearchState = {
  searchValue: '',
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    change(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
    clear(state) {
      state.searchValue = ''
    },
  },
})

export default searchSlice.reducer
