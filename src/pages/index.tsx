import { Route, Routes } from "react-router-dom";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<div>hello world</div>} />
    </Routes>
  );
};
