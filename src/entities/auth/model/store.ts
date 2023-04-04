import { createEffect, createEvent, createStore, forward } from "effector";
import { TAuth, TAuthModel } from "../types";
import { login } from "../api";

export const setNumber = createEvent<string>();
export const setPassword = createEvent<string>();
export const sendAuthData = createEvent<TAuth>();
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

forward({
  from: sendAuthData,
  to: sendAuthDataFx,
});
