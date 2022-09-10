import { configureStore } from "@reduxjs/toolkit";
import FrontPageSlice from "../FrontPage/FrontPageSlice";
export default configureStore({
  reducer: {
    frontPage: FrontPageSlice,
  },
});
