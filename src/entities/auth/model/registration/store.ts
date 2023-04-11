import { signIn } from "@entities/auth/api";
import { TRegistResponse, TRegistUser } from "@entities/auth/types";
import { createEffect, createEvent, createStore, sample } from "effector";
import { DEFAULT_ALERT_TIMEOUT, createAlert } from "@entities/alert";
import { persist } from "effector-storage/session";

const FIRSTNAME_KEY = "firstname";
const LASTNAME_KEY = "lastname";
const NUMBER_KEY = "regist_number";
const PASSWORD_KEY = "regist_password";

export const setFirstName = createEvent<string>();
export const setLastName = createEvent<string>();
export const setNumber = createEvent<string>();
export const setPassword = createEvent<string>();
export const sendRegist = createEvent();

export const $firstName = createStore("").on(
  setFirstName,
  (_, payload) => payload
);
export const $lastName = createStore("").on(
  setLastName,
  (_, payload) => payload
);
export const $registNumber = createStore("").on(
  setNumber,
  (_, payload) => payload
);
export const $registPassword = createStore("").on(
  setPassword,
  (_, payload) => payload
);

export const sendRegistFx = createEffect<TRegistUser, TRegistResponse, Error>(
  async (registParams) => {
    return await signIn(registParams);
  }
);

persist({
  store: $firstName,
  key: FIRSTNAME_KEY,
});
persist({
  store: $lastName,
  key: LASTNAME_KEY,
});
persist({
  store: $registPassword,
  key: PASSWORD_KEY,
});
persist({
  store: $registNumber,
  key: NUMBER_KEY,
});

sample({
  clock: sendRegist,
  fn: (): TRegistUser => {
    return {
      firstName: $firstName.getState(),
      lastName: $lastName.getState(),
      password: $registPassword.getState(),
      phone: $registNumber.getState().replaceAll(" ", ""),
    };
  },
  target: sendRegistFx,
});

sendRegistFx.doneData.watch((payload) => {
  if (!payload.success) {
    payload.errors?.forEach(({ msg, param }, index) => {
      const text =
        param === "first_name"
          ? "имени"
          : param === "last_name"
          ? "фамилии"
          : null;

      createAlert({
        message: text
          ? msg.replace("поля", text).replace("длинна", "длина")
          : msg,
        timeout: Math.floor(DEFAULT_ALERT_TIMEOUT / 3),
        type: "ERROR",
      });
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
