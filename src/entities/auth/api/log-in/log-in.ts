import { paths } from "@entities/auth/paths";
import { TAuth, TAuthModel } from "@entities/auth/types";

export const login = async (authParams: TAuth): Promise<TAuthModel> => {
  return await fetch(paths.login.path, {
    method: paths.login.method,
    body: JSON.stringify(authParams),
  })
    .then((res) => res.json())
    .catch(() => {
      throw new Error(
        "Произошла ошибка авторизации. Пожалуйста, проверьте корректность введеных данных."
      );
    });
};
