import { configureStore } from "@reduxjs/toolkit";
import schemaReducer from "../features/schemaSlice";
import layoutReducer from "../features/layoutSlice";
import formValuesReducer from "../features/formValuesSlice";

export default configureStore({
  reducer: {
    schema: schemaReducer,
    layout: layoutReducer,
    values: formValuesReducer,
  },
});
