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

function Home() {
  const location = useLocation();
  const id = location.state?.id;
  const email = location.state?.email;

  console.log(id);
  return (
    <HomeContainer>
      {id && email ? (
        <div>
          hi ~ {id} you are logined as {email}
        </div>
      ) : (
        <div>hi you are not logined</div>
      )}
    </HomeContainer>
  );
}

export default Home;
