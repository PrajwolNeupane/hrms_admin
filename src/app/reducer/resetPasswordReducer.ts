import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  resetPassword: boolean;
};

const initialState: InitialState = {
  resetPassword: false,
};

const resetPasswordReducer = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setResetPassword: (state, action) => {
      state.resetPassword = action.payload;
    },
  },
});

export default resetPasswordReducer.reducer;
export const { setResetPassword } = resetPasswordReducer.actions;
