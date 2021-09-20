import { createSlice } from '@reduxjs/toolkit'

import { defaultSchema } from '../store/data'; 

export const schemaSlice = createSlice({
  name: 'schema',
  initialState: defaultSchema,
  reducers: {
    reset: (state, action) => {
       return defaultSchema;
    },
    getSchemaSuccess: (state, {payload} ) => {
      return payload;
    },
  },
})

export const { reset, getSchemaSuccess } = schemaSlice.actions

export default schemaSlice.reducer

export function fetchSchema() {
  return async dispatch => {
    try {
      const response = await fetch('http://localhost:3001/api/schema')
      const data = await response.json()

      dispatch(getSchemaSuccess(data))
    } catch (error) {
      console.log("ERROR loading schema", error)
    }
  }
}