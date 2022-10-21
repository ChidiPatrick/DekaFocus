import { configureStore } from "@reduxjs/toolkit";
import FrontPageSlice from "../FrontPage/FrontPageSlice";
import PomodoroSettingSlice from "../PomodoroSetting/PomodoroSettingSlice"
export default configureStore({
  reducer: {
    frontPage: FrontPageSlice,
    PomodoroSetting: PomodoroSettingSlice,
  },
});
