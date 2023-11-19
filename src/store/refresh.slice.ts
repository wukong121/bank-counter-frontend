import {createSlice} from "@reduxjs/toolkit";

interface RefreshState {
  value: number;
}

const createInitState = (): RefreshState => {
  return {
    value: 0,
  }
};

const name = 'refresh';
const initState = createInitState();
const slice = createSlice({
      name: name,
      initialState: initState,
      reducers: {
        trigger: (state) => {
          state.value += 1;
        },
      }
    }
)

export const refreshAction = slice.actions;

export const refreshReducer = slice.reducer;