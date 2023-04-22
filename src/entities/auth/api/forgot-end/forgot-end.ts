import { DEFAULT_ERROR_MESSAGE, paths } from "@entities/auth/paths";
import { TForgotEnd, TForgotEndResponse } from "@entities/auth/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { userInfo } from "../user-info";

export const forgotEnd = createAsyncThunk<
  TForgotEndResponse,
  TForgotEnd,
  { rejectValue: Omit<TForgotEndResponse, "success"> }
>("forgodEnd", async (params, thunkAPI) => {
  const response = await fetch(paths.forgotEnd.path, {
    method: paths.forgotEnd.method,
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    return thunkAPI.rejectWithValue({
      message: DEFAULT_ERROR_MESSAGE,
    });
  }
  const result: TForgotEndResponse = await response.json();
  if (!result.success) {
    return thunkAPI.rejectWithValue(result);
  }
  thunkAPI.dispatch(userInfo(result.token!));
  return result;
});
