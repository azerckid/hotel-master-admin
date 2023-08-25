import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NaviContainer = styled.div`
  width: 300px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: dodgerblue;
  color: #fff;
`;

const NaviLink = styled(Link)`
  width: 300px;
  height: 50px;
  margin: 10px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: whitesmoke;
  text-decoration: none;
  cursor: pointer;
`;

export const NaviBar = () => {
  return (
    <NaviContainer>
      <NaviLink to={"/"}>Home</NaviLink>
      <NaviLink to={"/excel"}>Data Upload</NaviLink>
      <NaviLink to={"/login"}>Login</NaviLink>
    </NaviContainer>
  );
};
