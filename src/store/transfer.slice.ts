import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface TransferState {
  accountId: number;
}

const createInitState = (): TransferState => {
  return {
    accountId: 0,
  };
};

const name = 'transfer';
const initState = createInitState();
const slice = createSlice({
      name: name,
      initialState: initState,
      reducers: {
        update: (state, action:PayloadAction<number>) => {
          state.accountId = action.payload;
        },
      }
    }
)

export const transferAction = slice.actions;
export const transferReducer = slice.reducer;