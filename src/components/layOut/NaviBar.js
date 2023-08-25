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
  div:first-child {
    margin-top: 100px;
  }
`;

const NaviLink = styled(Link)`
  width: 240px;
  height: 30px;
  margin: 6px 0px;
  margin-left: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: whitesmoke;
  text-decoration: none;
  cursor: pointer;
`;

export const NaviBar = () => {
  return (
    <NaviContainer>
      <div>
        <NaviLink to={"/"}>Home</NaviLink>
        <NaviLink to={"/excel"}>Data Upload</NaviLink>
        <NaviLink to={"/login"}>Login</NaviLink>
      </div>
    </NaviContainer>
  );
};
