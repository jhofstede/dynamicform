import { createSlice } from '@reduxjs/toolkit'

import { defaultLayout } from '../store/data'; 

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: defaultLayout,
  reducers: {
    reset: (state) => {
       return defaultLayout;
    },
    getLayoutSuccess: (state, {payload} ) => {
      return payload;
    },
  },
})

export const { reset, getLayoutSuccess } = layoutSlice.actions

export default layoutSlice.reducer

export function fetchLayout() {
  return async dispatch => {
    try {
      const response = await fetch('http://localhost:3001/api/layout')
      const data = await response.json()

      dispatch(getLayoutSuccess(data))
    } catch (error) {
      console.log("ERROR loading schema", error)
    }
  }
}