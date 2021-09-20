import { createSlice } from '@reduxjs/toolkit';

export const formValuesSlice = createSlice({
  name: 'values',
  initialState: {},
  reducers: {
    setValue: (state, action) => {
       state = {...state, [action.payload.field] : action.payload.value}
       return state;
    }
  },
})

export const { setValue } = formValuesSlice.actions

export default formValuesSlice.reducer