import { DEFAULT_ALERT_TIMEOUT, createAlert } from "@entities/alert";
import { userInfo } from "@entities/auth/api";
import { TUser } from "@entities/auth/types";
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { logout } from "../logout-action";

const initialState: TUser = {
  firstName: "",
  id: 0,
  lastName: "",
  phone: "",
  token: "",
};

export const userModel = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      userInfo.fulfilled,
      (state, { payload }: PayloadAction<TUser>) => {
        return { ...payload };
      }
    );
    builder.addCase(userInfo.rejected, (state, { payload }) => {
      if (payload) {
        createAlert({
          message: payload,
          timeout: DEFAULT_ALERT_TIMEOUT,
          type: "ERROR",
        });
      }
      return { ...state };
    });
    builder.addCase(logout, () => initialState);
  },
});

export const userReducer = userModel.reducer;
export const getUser = () =>
  useSelector(
    createSelector(
      (state: RootState) => state.user,
      (state): TUser => {
        return {
          firstName: state.firstName,
          id: state.id,
          lastName: state.lastName,
          phone: state.phone,
          token: state.token,
        };
      }
    )
  );
