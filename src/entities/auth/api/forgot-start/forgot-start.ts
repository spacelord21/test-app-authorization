import { paths } from "@entities/auth/paths";
import { TForgotStart, TForgotStartResponse } from "@entities/auth/types";

export const forgotStart = async (
  params: TForgotStart
): Promise<TForgotStartResponse> => {
  return await fetch(paths.forgotStart.path, {
    body: JSON.stringify(params),
    method: paths.forgotStart.method,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error: Error) => {
      throw error;
    });
};
