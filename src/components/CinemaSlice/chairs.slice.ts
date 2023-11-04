import { createSlice } from "@reduxjs/toolkit";

const chairSlice = createSlice({
  name: "chairs",
  initialState: null,
  reducers: {
    // Action để lưu chi nhánh rạp được chọn
    setChair: (state, action) => {
      return action.payload;
    },
  },
});

export const { setChair } = chairSlice.actions;

export default chairSlice.reducer;
