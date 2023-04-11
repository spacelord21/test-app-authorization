import { paths } from "@entities/auth/paths";
import { TUserInfo } from "@entities/auth/types";

export const userInfo = async (token: string): Promise<TUserInfo> => {
  return await fetch(paths.userInfo.path, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    method: paths.userInfo.method,
  })
    .then((res) => res.json())
    .then((data) => {
      return {
        firstName: data.first_name,
        lastName: data.last_name,
        password: data.password,
        phone: data.phone,
      };
    })
    .catch((error: Error) => {
      throw error;
    });
};
