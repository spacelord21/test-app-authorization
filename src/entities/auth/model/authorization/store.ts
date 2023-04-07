import { createEffect, createEvent, createStore, sample } from "effector";
import { TAuth, TAuthModel } from "../../types";
import { login } from "../../api";
import { DEFAULT_ALERT_TIMEOUT, createAlert } from "@entities/alert";
import { persist } from "effector-storage/session";

const NUMBER_KEY = "number";
const PASSWORD_KEY = "password";
const TOKEN = "token";

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
    createAlert({
      message: payload.message!,
      timeout: DEFAULT_ALERT_TIMEOUT,
      type: "ERROR",
    });
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
