import { createEffect, createEvent, createStore, sample } from "effector";
import { TAuth, TAuthModel, TUserInfo } from "../../types";
import { login } from "../../api";
import { DEFAULT_ALERT_TIMEOUT, createAlert } from "@entities/alert";
import { persist } from "effector-storage/session";
import { userInfo } from "@entities/auth/api/user-info";
import { setFirstName, setLastName } from "../registration";

const NUMBER_KEY = "number";
const PASSWORD_KEY = "password";
const TOKEN = "token";

export const clearSession = createEvent();
export const setToken = createEvent<string>();
export const setNumber = createEvent<string>();
export const setPassword = createEvent<string>();
export const setRemember = createEvent<void>();
export const sendAuthData = createEvent();
export const sendAuthDataFx = createEffect<TAuth, TAuthModel, Error>(
  async (authParams) => {
    return await login(authParams);
  }
);
export const getUserInfoFx = createEffect<string, TUserInfo, Error>(
  async (token) => {
    return await userInfo(token);
  }
);
export const $token = createStore("").on(setToken, (_, payload) => payload);
export const $number = createStore("").on(setNumber, (_, payload) => payload);
export const $password = createStore("").on(
  setPassword,
  (_, payload) => payload
);
export const $rememberMe = createStore(false).on(
  setRemember,
  (state, _) => !state
);
export const $user = createStore<TUserInfo>({
  firstName: "",
  lastName: "",
  password: "",
  phone: "",
}).on(getUserInfoFx.doneData, (state, payload) => payload);

persist({
  store: $token,
  key: TOKEN,
});

persist({
  store: $number,
  key: NUMBER_KEY,
});

persist({
  store: $password,
  key: PASSWORD_KEY,
});

sample({
  clock: sendAuthData,
  fn: (): TAuth => {
    return {
      phone: $number.getState().replaceAll(" ", ""),
      password: $password.getState(),
    };
  },
  target: sendAuthDataFx,
});

sendAuthDataFx.doneData.watch((payload) => {
  if (!payload.success) {
    if (payload.errors) {
      payload.errors?.map((error) => {
        createAlert({
          message: error.msg!,
          timeout: DEFAULT_ALERT_TIMEOUT / 3,
          type: "ERROR",
        });
      });
    } else {
      createAlert({
        message: payload.message!,
        timeout: DEFAULT_ALERT_TIMEOUT / 3,
        type: "ERROR",
      });
    }
  } else {
    setToken(payload.token!);
  }
});

sendAuthDataFx.failData.watch((payload) => {
  createAlert({
    message: payload.message,
    timeout: DEFAULT_ALERT_TIMEOUT,
    type: "ERROR",
  });
});

getUserInfoFx.doneData.watch((payload) => {
  setPassword(payload.password);
  setNumber(payload.phone);
  setFirstName(payload.firstName);
  setLastName(payload.lastName);
});

clearSession.watch(() => {
  sessionStorage.clear();
  localStorage.clear();
});
