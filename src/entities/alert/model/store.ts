import { createEvent, createStore } from "effector";
import { TAlert } from "../types";

export const DEFAULT_ALERT_TIMEOUT = 10000;
export const $alert = createStore<TAlert | null>(null);

export const createAlert = createEvent<TAlert>();
export const removeAlert = createEvent();

$alert.on(removeAlert, () => null);
$alert.on(createAlert, (_, payload) => payload);

var timeout: ReturnType<typeof setTimeout>;
$alert.watch((alert) => {
  clearTimeout(timeout);
  if (!alert) return;
  timeout = setTimeout(() => {
    removeAlert();
  }, alert.timeout);
});
