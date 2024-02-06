import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState = {
  value: {
    bmi: 0,
    isClicked: false,
  },
};
export const bmiSlice = createSlice({
  name: "bmi",
  initialState,
  reducers: {
    changeBmi: (state, action) => {
      return {
        value: {
          bmi: action.payload,
          isClicked: true,
        },
      };
    },
  },
});
export const { changeBmi } = bmiSlice.actions;
export default bmiSlice.reducer;
