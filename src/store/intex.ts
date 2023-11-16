import {configureStore} from "@reduxjs/toolkit";
import {refreshReducer} from "./refresh.slice";

export const store = configureStore({
  reducer: {
    refresh: refreshReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;