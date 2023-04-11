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

const PasswordRecoveryPage = lazy(() =>
  import("./password-recovery").then(({ PasswordRecovery }) => ({
    default: PasswordRecovery,
  }))
);

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthorizationPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/password-recovery" element={<PasswordRecoveryPage />} />
    </Routes>
  );
};
