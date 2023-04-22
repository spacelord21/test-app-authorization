import { createSelector, createSlice } from "@reduxjs/toolkit";
import { signIn } from "@entities/auth/api";
import { DEFAULT_ALERT_TIMEOUT, createAlert } from "@entities/alert";
import { useSelector } from "react-redux";
import { logout } from "../logout-action";
import { DEFAULT_ERROR_MESSAGE } from "@entities/auth/paths";

type TRegistSlice = {
  loading: boolean;
  success: boolean;
};

const initialState: TRegistSlice = {
  loading: false,
  success: false,
};

export const registModel = createSlice({
  name: "regist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      return { ...state, loading: !state.loading };
    });
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      return { ...state, loading: !state.loading, success: true };
    });
    builder.addCase(signIn.rejected, (state, { payload }) => {
      if (!payload) {
        createAlert({
          message: DEFAULT_ERROR_MESSAGE,
          timeout: DEFAULT_ALERT_TIMEOUT,
          type: "ERROR",
        });
        return { ...state, loading: !state.loading };
      }
      if (payload.errors) {
        payload.errors.map((error) => {
          createAlert({
            message: error.msg,
            timeout: DEFAULT_ALERT_TIMEOUT,
            type: "ERROR",
          });
        });
        return { ...state, loading: !state.loading };
      }
      createAlert({
        message: payload.message!,
        timeout: DEFAULT_ALERT_TIMEOUT,
        type: "ERROR",
      });
      return { ...state, loading: !state.loading };
    });
    builder.addCase(logout, () => initialState);
  },
});

export const registReducer = registModel.reducer;

export const registState = () =>
  useSelector(
    createSelector(
      (state: RootState) => state.regist,
      (state) => state
    )
  );
