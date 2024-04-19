import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  auth: any | null;
};

const initialState: InitialState = {
  auth: null,
};

const authReducer = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
  },
});

export default authReducer.reducer;
export const { setAuth } = authReducer.actions;
