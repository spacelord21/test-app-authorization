import { DEFAULT_ALERT_TIMEOUT, createAlert } from "@entities/alert";
import { forgotEnd, forgotStart } from "@entities/auth/api";
import { TForgotStartResponse } from "@entities/auth/types";
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { logout } from "../logout-action";
import { DEFAULT_ERROR_MESSAGE } from "@entities/auth/paths";

type TPasswordRecovery = {
  loading: boolean;
  startSuccess: boolean;
  endSuccess: boolean;
};

const initialState: TPasswordRecovery = {
  loading: false,
  startSuccess: false,
  endSuccess: false,
};

export const passwordRecoveryModel = createSlice({
  name: "passwordRecovery",
  initialState,
  reducers: {
    clearProgress: (state) => {
      return { ...state, startSuccess: false };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(forgotStart.pending, (state) => {
      return { ...state, loading: !state.loading };
    });
    builder.addCase(
      forgotStart.fulfilled,
      (state, { payload }: PayloadAction<TForgotStartResponse>) => {
        return {
          ...state,
          loading: !state.loading,
          startSuccess: payload.success,
        };
      }
    );
    builder.addCase(forgotStart.rejected, (state, { payload }) => {
      if (!payload) {
        createAlert({
          message: DEFAULT_ERROR_MESSAGE,
          timeout: DEFAULT_ALERT_TIMEOUT,
          type: "ERROR",
        });
        return { ...state, loading: false };
      }
      if (payload.errors) {
        payload.errors.map((error) => {
          createAlert({
            message: error.msg,
            timeout: DEFAULT_ALERT_TIMEOUT,
            type: "ERROR",
          });
        });
      } else {
        createAlert({
          message: payload.message,
          timeout: DEFAULT_ALERT_TIMEOUT,
          type: "ERROR",
        });
        return { ...state, loading: !state.loading, startSuccess: false };
      }
      return {
        ...state,
        loading: !state.loading,
        startSuccess: false,
      };
    });
    builder.addCase(forgotEnd.pending, (state) => {
      return { ...state, loading: !state.loading };
    });
    builder.addCase(forgotEnd.fulfilled, (state, { payload }) => {
      return { ...state, loading: !state.loading, endSuccess: payload.success };
    });
    builder.addCase(forgotEnd.rejected, (state, { payload }) => {
      if (!payload) {
        createAlert({
          message: DEFAULT_ERROR_MESSAGE,
          timeout: DEFAULT_ALERT_TIMEOUT,
          type: "ERROR",
        });
        return { ...state, loading: !state.loading, endSuccess: false };
      }
      if (payload.errors) {
        payload.errors.map((error) => {
          createAlert({
            message: error.msg,
            timeout: DEFAULT_ALERT_TIMEOUT,
            type: "ERROR",
          });
        });
      } else {
        createAlert({
          message: payload.message,
          timeout: DEFAULT_ALERT_TIMEOUT,
          type: "ERROR",
        });

        return { ...state, loading: !state.loading, endSuccess: false };
      }
      return { ...state, loading: !state.loading, endSuccess: false };
    });
    builder.addCase(logout, () => initialState);
  },
});

export const passwordRecoveryReducer = passwordRecoveryModel.reducer;
export const { clearProgress } = passwordRecoveryModel.actions;

export const passwordRecoveryState = () =>
  useSelector(
    createSelector(
      (state: RootState) => state.passwordRecovery,
      (state) => state
    )
  );
