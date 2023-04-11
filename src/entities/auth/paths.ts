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
  forgotStart: {
    method: "POST",
    path: AUTH_URL + "/api/user/forgot-start",
  },
  forgotEnd: {
    method: "POST",
    path: AUTH_URL + "/api/user/forgot-end",
  },
  userInfo: {
    method: "GET",
    path: AUTH_URL + "/api/user",
  },
};
