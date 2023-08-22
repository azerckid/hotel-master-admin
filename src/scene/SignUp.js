import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const SignUpContainer = styled.div`
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
const SignUpTitle = styled.div``;
const SignUpForm = styled.form`
  width: 300px;
  margin: 50px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SignUpInput = styled.input`
  width: 250px;
  height: 30px;
  margin: 4px 0;
`;

function SignUp() {
  const [ID, setID] = useState("");
  const [PW, setPW] = useState("");
  const [Email, setEmail] = useState("");

  const history = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const signUpData = {
      id: ID,
      pw: PW,
      email: Email,
    };
    console.log(signUpData);
    try {
      const response = await axios
        .post(process.env.REACT_APP_API_URL + "/user/signup", signUpData)
        .then((res) => {
          if (res.data.message === "User created") {
            alert("회원가입 성공");
            history("/login");
          }
          if (res.data.message === "User already exists") {
            alert("이미 존재하는 아이디입니다.");
          }
          console.log(response);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SignUpContainer>
      <SignUpTitle>SignUP</SignUpTitle>
      <SignUpForm>
        <SignUpInput
          name=""
          type="text"
          placeholder="아이디를 입력하세요"
          onChange={(e) => {
            setID(e.target.value);
            console.log(ID);
          }}
        />
        <SignUpInput
          name=""
          type="password"
          placeholder="비밀번호를 입력하세요"
          onChange={(e) => {
            setPW(e.target.value);
            console.log(PW);
          }}
        />
        <SignUpInput
          name=""
          type="email"
          placeholder="이메일을 입력하세요"
          onChange={(e) => {
            setEmail(e.target.value);
            console.log(Email);
          }}
        />
        <SignUpInput type="submit" value="회원가입" onClick={submit} />
      </SignUpForm>
      <Link to={"/login"}>go to the login page</Link>
    </SignUpContainer>
  );
}

export default SignUp;
