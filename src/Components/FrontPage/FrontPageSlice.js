import { createSlice } from "@reduxjs/toolkit";

const FrontPageSlice = createSlice({
  name: "FrontPage",
  initialState: {
    seconds: "",
    hours: "minutes * 60",
    minutes: "seconds * 60",
  },
  reducers: {},
});
export default FrontPageSlice.reducer;
