import { signIn } from "@entities/auth/api";
import { TRegistResponse, TRegistUser } from "@entities/auth/types";
import { createEffect, createEvent, createStore, sample } from "effector";
import { $number, $password } from "../authorization";
import { DEFAULT_ALERT_TIMEOUT, createAlert } from "@entities/alert";

export const setFirstName = createEvent<string>();
export const setLastName = createEvent<string>();
export const sendRegist = createEvent();

export const $firstName = createStore("").on(
  setFirstName,
  (_, payload) => payload
);
export const $lastName = createStore("").on(
  setLastName,
  (_, payload) => payload
);

export const sendRegistFx = createEffect<TRegistUser, TRegistResponse, Error>(
  async (registParams) => {
    return await signIn(registParams);
  }
);

sample({
  clock: sendRegist,
  fn: (): TRegistUser => {
    return {
      firstName: $firstName.getState(),
      lastName: $lastName.getState(),
      password: $password.getState(),
      phone: $number.getState().replaceAll(" ", ""),
    };
  },
  target: sendRegistFx,
});

sendRegistFx.doneData.watch((payload) => {
  if (!payload.success) {
    createAlert({
      message: payload.message!,
      timeout: DEFAULT_ALERT_TIMEOUT,
      type: "ERROR",
    });
  }
});

sendRegistFx.failData.watch((payload) => {
  createAlert({
    message: payload.message,
    timeout: DEFAULT_ALERT_TIMEOUT,
    type: "ERROR",
  });
});
