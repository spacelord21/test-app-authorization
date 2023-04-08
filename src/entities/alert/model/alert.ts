import { createEvent, createStore } from "effector";
import { TAlert } from "../types";

export const DEFAULT_ALERT_TIMEOUT = 10000;
export const $alerts = createStore<TAlert[]>([]);

export const createAlert = createEvent<TAlert>();
export const removeAlert = createEvent();

$alerts.on(removeAlert, (state, _) => {
  return state.slice(1, state.length);
});
$alerts.on(createAlert, (state, payload) => {
  if (state) {
    let include = false;
    state.forEach((item) => {
      if (item.message === payload.message) {
        include = true;
      }
    });
    if (include) {
      return [...state];
    }
    return [...state, payload];
  }
  return [payload];
});

var timeout: ReturnType<typeof setInterval>;
createAlert.watch((alert) => {
  clearInterval(timeout);
  if (!alert) return;
  timeout = setInterval(() => {
    removeAlert();
  }, alert.timeout);
});
