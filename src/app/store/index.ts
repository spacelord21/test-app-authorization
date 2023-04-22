import { authReducer } from "@entities/auth";
import { passwordRecoveryReducer } from "@entities/auth/model";
import { registReducer } from "@entities/auth/model/registration";
import { userReducer } from "@entities/auth/model/user";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    authParams: authReducer,
    passwordRecovery: passwordRecoveryReducer,
    regist: registReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
