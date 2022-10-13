import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  minute5: 5,
  minute15: 900,
  minute25: 1500,
  minute45: 2700,
  currentTime: null,
  running: true,
  Pause: true,
  Continue: false,
  stop: false,
  break: false,
  counting: false,
};
const FrontPageSlice = createSlice({
  name: "FrontPage",
  initialState,
  reducers: {
    updateCurrnetTime(state, action) {
      state.currentTime = action.payload;
    },
    resetState(state, action) {
      state.minute5 = 5;
      state.minute15 = 900;
      state.minute25 = 1500;
      state.minute45 = 2700;
      state.running = true;
      state.Pause = true;
      state.Continue = false;
      state.stop = false;
    },
    startCounting(state, action) {
      state.counting = true;
    },
    endCounting(state, action) {
      state.counting = false;
    },
    hideStartBtn(state, action) {
      state.running = false;
    },
    showStartBtn(state, action) {
      state.running = true;
    },
    hidePauseBtn(state, action) {
      state.Pause = false;
    },
    showPauseBtn(state, action) {
      state.Pause = true;
    },
    showContinueBtn(state, action) {
      state.Continue = true;
    },
    hideContinueBtn(state, action) {
      state.Continue = false;
    },
    showStopBtn(state, action) {
      state.stop = true;
    },
    hideStopBtn(state, action) {
      state.stop = false;
    },
    breakStart(state, action) {
      state.break = true;
    },
    breakEnd(state, action) {
      state.break = false;
    },
  },
});

export const {
  showStartBtn,
  hideStartBtn,
  showPauseBtn,
  hidePauseBtn,
  showStopBtn,
  hideStopBtn,
  showContinueBtn,
  hideContinueBtn,
  breakEnd,
  breakStart,
  resetState,
  startCounting,
  endCounting,
  updateCurrnetTime,
} = FrontPageSlice.actions;
export default FrontPageSlice.reducer;
