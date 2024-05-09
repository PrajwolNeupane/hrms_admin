import { configureStore } from "@reduxjs/toolkit";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "./reducer/authReducer";
import resetPasswordReducer from "./reducer/resetPasswordReducer";

export const store = configureStore({
  reducer: {
    Auth: authReducer,
    ResetPassword: resetPasswordReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
