import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const LoginContainer = styled.div`
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
const LoginTitle = styled.div``;
const LoginForm = styled.form`
  width: 300px;
  margin: 50px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const LoginInput = styled.input`
  width: 250px;
  height: 30px;
  margin: 4px 0;
`;

function Login() {
  const [ID, setID] = useState("");
  const [PW, setPW] = useState("");
  const [Email, setEmail] = useState("");

  const history = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const loginData = {
      id: ID,
      pw: PW,
      email: Email,
    };
    console.log(loginData);
    console.log(process.env.REACT_APP_API_URL);
    try {
      const response = await axios
        .post(process.env.REACT_APP_API_URL + "/user/login", loginData)
        .then((res) => {
          if (res.data.message === "Login Success") {
            history("/", { state: { id: ID } });
          } else {
            alert("로그인 실패");
          }
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginContainer>
      <LoginTitle>로그인</LoginTitle>
      <LoginForm action="POST">
        <LoginInput
          name=""
          type="text"
          placeholder="아이디를 입력하세요"
          onChange={(e) => {
            setID(e.target.value);
            console.log(ID);
          }}
        />
        <LoginInput
          name=""
          type="password"
          placeholder="비밀번호를 입력하세요"
          onChange={(e) => {
            setPW(e.target.value);
            console.log(PW);
          }}
        />
        <LoginInput
          name=""
          type="email"
          placeholder="이메일을 입력하세요"
          onChange={(e) => {
            setEmail(e.target.value);
            console.log(Email);
          }}
        />
        <LoginInput type="submit" value="로그인" onClick={submit} />
      </LoginForm>
      <Link to={"/signup"}>go to the signup page</Link>
    </LoginContainer>
  );
}

export default Login;
