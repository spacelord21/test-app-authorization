import { DEFAULT_ERROR_MESSAGE, paths } from "@entities/auth/paths";
import { TUser } from "@entities/auth/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

type TUserModel = Pick<TUser, "id" | "phone"> & {
  first_name: string;
  last_name: string;
  token: string;
};

export const userInfo = createAsyncThunk<
  TUser,
  string,
  { rejectValue: string }
>("userInfo", async (token, { rejectWithValue }) => {
  const response = await fetch(paths.userInfo.path, {
    method: paths.userInfo.method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  if (!response.ok) {
    return rejectWithValue(DEFAULT_ERROR_MESSAGE);
  }
  const result: TUserModel = await response.json();
  return {
    ...result,
    firstName: result.first_name,
    lastName: result.last_name,
    token: token,
  };
});
