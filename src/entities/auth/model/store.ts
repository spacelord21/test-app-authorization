import {
  createEffect,
  createEvent,
  createStore,
  forward,
  sample,
} from "effector";
import { TAuth, TAuthModel } from "../types";
import { login } from "../api";
import { DEFAULT_ALERT_TIMEOUT, createAlert } from "@entities/alert";

export const setNumber = createEvent<string>();
export const setPassword = createEvent<string>();
export const setRemember = createEvent<void>();
export const sendAuthData = createEvent();
const sendAuthDataFx = createEffect<TAuth, TAuthModel, Error>(
  async (authParams) => {
    return await login(authParams);
  }
);

export const $number = createStore("").on(setNumber, (_, payload) => payload);
export const $password = createStore("").on(
  setPassword,
  (_, payload) => payload
);
export const $rememberMe = createStore(false).on(
  setRemember,
  (state, _) => !state
);

sendAuthDataFx.failData.watch((payload) => {
  createAlert({
    message: payload.message,
    timeout: DEFAULT_ALERT_TIMEOUT,
    type: "ERROR",
  });
});
