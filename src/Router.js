import { BrowserRouter, Routes, Route } from "react-router-dom";

import { NaviBar } from "./components/layOut/NaviBar";

import Login from "./scene/Login";
import SingUp from "./scene/SignUp";
import Excel from "./scene/Excel";

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <NaviBar />
      <Routes>
        <Route path="/" element={<Excel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SingUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
