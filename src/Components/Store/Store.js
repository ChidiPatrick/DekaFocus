import { combineReducers, configureStore } from "@reduxjs/toolkit";
import FrontPageSlice from "../FrontPage/FrontPageSlice";
import PomodoroSettingSlice from "../PomodoroSetting/PomodoroSettingSlice";
import SettingSlice from '../Settings/SettingsSlice'
import TonesSlice from "../Tones/TonesSlice";
import SignUpFormSlice from "../SignUpForms/SignUpFormSlice";
import AddProjectSlice from "../AddProject/AddProjectSlice";
import storage from "redux-persist/lib/storage"
import {persistReducer,persistStore} from "redux-persist"
import thunk from "redux-thunk";
import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel1
}
const rootReducer = combineReducers({
    frontPage: FrontPageSlice,
    PomodoroSetting: PomodoroSettingSlice,
    settings: SettingSlice,
    tones: TonesSlice,
    signUpSlice: SignUpFormSlice,
    AddProject: AddProjectSlice,
})
export const persistedReducer = persistReducer(persistConfig,rootReducer)

export const Store =  configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
//   reducer: {
//     frontPage: FrontPageSlice,
//     PomodoroSetting: PomodoroSettingSlice,
//     settings: SettingSlice,
//     tones: TonesSlice,
//     signUpSlice: SignUpFormSlice,
//     AddProject: AddProjectSlice,
// }
});

export const persistor = persistStore(Store)