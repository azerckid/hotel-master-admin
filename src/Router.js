import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import { NaviBar } from "./components/layOut/NaviBar";

import Login from "./scene/Login";
import SingUp from "./scene/SignUp";
import Excel from "./scene/Excel";
import Home from "./scene/Home";

const Frame = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Frame>
        <NaviBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/excel" element={<Excel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SingUp />} />
        </Routes>
      </Frame>
    </BrowserRouter>
  );
};

export default Router;
