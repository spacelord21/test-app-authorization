import { paths } from "@entities/auth/paths";
import { TForgotEnd, TForgotEndResponse } from "@entities/auth/types";

export const forgotEnd = async (
  params: TForgotEnd
): Promise<TForgotEndResponse> => {
  return await fetch(paths.forgotEnd.path, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
    method: paths.forgotEnd.method,
  })
    .then((res) => res.json())
    .catch((error: Error) => {
      throw Error;
    });
};
