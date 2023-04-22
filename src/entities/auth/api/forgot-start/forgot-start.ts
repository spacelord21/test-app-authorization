import { paths } from "@entities/auth/paths";
import { TForgotStart, TForgotStartResponse } from "@entities/auth/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const forgotStart = createAsyncThunk<
  TForgotStartResponse,
  TForgotStart,
  { rejectValue: Omit<TForgotStartResponse, "success"> }
>("forgotStart", async (params, thunkApi) => {
  const response = await fetch(paths.forgotStart.path, {
    method: paths.forgotStart.method,
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result: TForgotStartResponse = await response.json();
  if (!result.success) {
    return thunkApi.rejectWithValue(result);
  }
  return result;
});
