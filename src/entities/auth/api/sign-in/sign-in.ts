import { paths } from "@entities/auth/paths";
import { TRegistResponse, TRegistUser } from "@entities/auth/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { userInfo } from "../user-info";

export const signIn = createAsyncThunk<
  TRegistResponse,
  TRegistUser,
  { rejectValue: TRegistResponse }
>("registration", async (registParams, thunkAPI) => {
  const response = await fetch(paths.signin.path, {
    method: paths.signin.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone: registParams.phone,
      password: registParams.password,
      first_name: registParams.firstName,
      last_name: registParams.lastName,
    }),
  });
  const result: TRegistResponse = await response.json();
  if (!result.success) {
    return thunkAPI.rejectWithValue(result);
  }
  thunkAPI.dispatch(userInfo(result.token!));
  return result;
});
