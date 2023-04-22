import { DEFAULT_ALERT_TIMEOUT, createAlert } from "@entities/alert";
import { login } from "@entities/auth/api";
import { TAuthModel } from "@entities/auth/types";
import {
  Action,
  AnyAction,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { logout } from "../logout-action";
import { DEFAULT_ERROR_MESSAGE } from "@entities/auth/paths";

type TAuthState = {
  loading: boolean;
};

export const initialState: TAuthState = {
  loading: false,
};

interface RejectedAction extends Action {
  payload: Omit<TAuthModel, "success" | "token">;
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith("rejected");
}

export const authParamsModel = createSlice({
  name: "authParams",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, _) => {
      return { ...state, loading: true };
    });
    builder.addCase(login.fulfilled, (state) => {
      return { success: true, loading: false };
    });
    builder.addCase(logout, () => initialState);
    builder.addMatcher(isRejectedAction, (state, { payload }) => {
      if (!payload) {
        createAlert({
          message: DEFAULT_ERROR_MESSAGE,
          timeout: DEFAULT_ALERT_TIMEOUT,
          type: "ERROR",
        });
        return { ...state, loading: false };
      }
      if (payload.errors) {
        payload.errors!.map((error) => {
          createAlert({
            message: error.msg,
            timeout: DEFAULT_ALERT_TIMEOUT,
            type: "ERROR",
          });
        });
        return { ...state, loading: false };
      }
      createAlert({
        message: payload.message!,
        timeout: DEFAULT_ALERT_TIMEOUT,
        type: "ERROR",
      });
      return { ...state, loading: false };
    });
  },
});

export const authReducer = authParamsModel.reducer;

export const useAuthForm = () =>
  useSelector(
    createSelector(
      (state: RootState) => state.authParams,
      (authParams) => authParams
    )
  );
