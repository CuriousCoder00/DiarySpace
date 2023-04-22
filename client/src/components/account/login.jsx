import React from "react";
import { useState } from "react";

import { TextField, Box, Button, Typography, styled } from "@mui/material";

import bloggerImg from "../../assets/blooger.png";
import diarySpaceImg from "../../assets/logo.png";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgba(0 0 0/ 0.6);
`;

const Image = styled("img")({
  width: 100,
  display: "flex",
  margin: "auto",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  overflow: auto;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;

const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;

const Login = () => {
  const [account, toggleAccount] = useState("login");

  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };
  return (
    <Component>
      <Box>
        <Wrapper>
          <Image src={bloggerImg} alt="blogger" />
          <Image
            src={diarySpaceImg}
            style={{ filter: "invert(100%)" }}
            alt="DiarySpace"
          />
          <Text>Create Your Space</Text>
        </Wrapper>
        {account === "login" ? (
          <Wrapper>
            <TextField
              varient="standard"
              name="username"
              label="Enter Username"
            />
            <TextField
              varient="standard"
              name="password"
              label="Enter Password"
            />

            <LoginButton variant="contained">Login</LoginButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <SignupButton
              onClick={() => toggleSignup()}
              style={{ marginBottom: 50 }}
            >
              Create an account
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField variant="standard" name="name" label="Enter Name" />
            <TextField
              variant="standard"
              name="username"
              label="Enter Username"
            />
            <TextField
              variant="standard"
              name="password"
              label="Enter Password"
            />

            <SignupButton>Signup</SignupButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <LoginButton variant="contained" onClick={() => toggleSignup()}>
              Already have an account?
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
