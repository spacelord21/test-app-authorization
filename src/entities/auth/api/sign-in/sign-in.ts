import { paths } from "@entities/auth/paths";
import { TRegistResponse, TRegistUser } from "@entities/auth/types";

export const signIn = async (
  registParams: TRegistUser
): Promise<TRegistResponse> => {
  return await fetch(paths.signin.path, {
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
  })
    .then((res) => res.json())
    .catch((error: Error) => {
      throw error;
    });
};
