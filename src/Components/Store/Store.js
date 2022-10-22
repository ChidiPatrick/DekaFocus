import { configureStore } from "@reduxjs/toolkit";
import FrontPageSlice from "../FrontPage/FrontPageSlice";
import PomodoroSettingSlice from "../PomodoroSetting/PomodoroSettingSlice";
import SettingSlice from '../Settings/SettingsSlice'
export default configureStore({
  reducer: {
    frontPage: FrontPageSlice,
    PomodoroSetting: PomodoroSettingSlice,
    settings: SettingSlice,
  },
});
