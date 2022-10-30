import { configureStore } from "@reduxjs/toolkit";
import FrontPageSlice from "../FrontPage/FrontPageSlice";
import PomodoroSettingSlice from "../PomodoroSetting/PomodoroSettingSlice";
import SettingSlice from '../Settings/SettingsSlice'
import TonesSlice from "../Tones/TonesSlice";
export default configureStore({
  reducer: {
    frontPage: FrontPageSlice,
    PomodoroSetting: PomodoroSettingSlice,
    settings: SettingSlice,
    tones: TonesSlice,
  },
});
