import {configureStore} from "@reduxjs/toolkit";
import {refreshReducer} from "./refresh.slice";
import {transferReducer} from "./transfer.slice";

export const store = configureStore({
  reducer: {
    refresh: refreshReducer,
    transfer: transferReducer,

  }
})

export type RootState = ReturnType<typeof store.getState>;