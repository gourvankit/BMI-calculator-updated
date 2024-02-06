import { configureStore } from "@reduxjs/toolkit";
import bmiReducer from "./features/bmi-slice";
export const store = configureStore({
  reducer: { bmiReducer },
});
