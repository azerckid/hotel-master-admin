import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NaviContainer = styled.div`
  width: 100vw;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  color: #fff;
`;

const NaviLink = styled(Link)`
  margin: 0 20px;
  color: whitesmoke;
  text-decoration: none;
  cursor: pointer;
`;

export const NaviBar = () => {
  return (
    <NaviContainer>
      <NaviLink to={"/"}>Excel</NaviLink>
      <NaviLink to={"/login"}>Login</NaviLink>
    </NaviContainer>
  );
};
