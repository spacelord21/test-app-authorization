import { paths } from "@entities/auth/paths";
import { TAuth, TAuthModel } from "@entities/auth/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { userInfo } from "../user-info";

export const login = createAsyncThunk<
  void,
  TAuth,
  { rejectValue: Omit<TAuthModel, "success" | "token"> }
>("login", async (authParams, { rejectWithValue, dispatch }) => {
  const response = await fetch(paths.login.path, {
    method: paths.login.method,
    body: JSON.stringify(authParams),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result: TAuthModel = await response.json();
  if (!result.success) {
    return rejectWithValue({
      errors: result.errors,
      message: result.message,
    });
  }
  dispatch(userInfo(result.token!));
});
