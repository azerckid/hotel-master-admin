import React from "react";
import styled from "styled-components";

const HomeContainer = styled.div`
  width: 100vw;
  height: 600px;
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

function Home() {
  return <HomeContainer>Home</HomeContainer>;
}

export default Home;
