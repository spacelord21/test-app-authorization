import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

const AuthorizationPage = lazy(() =>
  import("./authorization").then(({ Authorization }) => ({
    default: Authorization,
  }))
);

const RegistrationPage = lazy(() =>
  import("./registration").then(({ Registration }) => ({
    default: Registration,
  }))
);

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthorizationPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
    </Routes>
  );
};
