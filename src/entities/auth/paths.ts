const AUTH_URL = "https://backend-front-test.dev.echo-company.ru";

export const paths = {
  login: {
    method: "POST",
    path: AUTH_URL + "/api/auth/login",
  },
  signin: {
    method: "POST",
    path: AUTH_URL + "/api/user/registration",
  },
};
