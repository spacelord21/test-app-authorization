import { DEFAULT_ALERT_TIMEOUT, createAlert } from "@entities/alert";
import { forgotEnd, forgotStart } from "@entities/auth/api";
import {
  TForgotEnd,
  TForgotEndResponse,
  TForgotStart,
  TForgotStartResponse,
} from "@entities/auth/types";
import { createEffect } from "effector";
import { setToken } from "../authorization";

export const forgotStartFx = createEffect<
  TForgotStart,
  TForgotStartResponse,
  Error
>(async (params) => {
  return await forgotStart(params);
});
export const forgotEndFx = createEffect<TForgotEnd, TForgotEndResponse, Error>(
  async (params) => {
    return await forgotEnd(params);
  }
);

forgotStartFx.doneData.watch((payload) => {
  if (!payload.success) {
    createAlert({
      message: payload.message,
      timeout: DEFAULT_ALERT_TIMEOUT,
      type: "ERROR",
    });
  }
});

forgotEndFx.doneData.watch((payload) => {
  if (!payload.success) {
    payload.errors
      ? payload.errors.map((error) =>
          createAlert({
            message: error.msg.replaceAll("длинна", "длина"),
            timeout: DEFAULT_ALERT_TIMEOUT,
            type: "ERROR",
          })
        )
      : createAlert({
          message: payload.message,
          timeout: DEFAULT_ALERT_TIMEOUT,
          type: "ERROR",
        });
  } else {
    setToken(payload.token!);
  }
});
