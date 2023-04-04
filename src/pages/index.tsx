import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

const AuthorizationPage = lazy(() =>
  import("./authorization").then(({ Authorization }) => ({
    default: Authorization,
  }))
);

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthorizationPage />} />
    </Routes>
  );
};
