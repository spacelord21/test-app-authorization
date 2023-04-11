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

const HomePage = lazy(() =>
  import("./home").then(({ Home }) => ({ default: Home }))
);

export const Routing = () => {
  return (
    <Routes>
      <Route path="/login" element={<AuthorizationPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/password-recovery" element={<PasswordRecoveryPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};
