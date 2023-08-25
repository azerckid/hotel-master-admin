import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const HomeContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 912px) {
    color: red;
    width: 100vw;
    height: 100vh;
    flex-direction: column;
  }
`;

function Err404() {
  const location = useLocation();
  const id = location.state?.id;

  console.log(id);
  return (
    <HomeContainer>
      <div>404</div>
    </HomeContainer>
  );
}

export default Err404;
