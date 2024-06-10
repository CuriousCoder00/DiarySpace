import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { TextField, Box, Button, Typography, styled } from "@mui/material";

import bloggerImg from "../../assets/blooger.png";
import diarySpaceImg from "../../assets/logo.png";
import { API } from "../../services/Api";
import { DataContext } from "../../context/DataProvider";


const Component = styled(Box)`
  width: 450px;
  margin: auto;
  box-shadow: 3px 2px 5px 2px rgba(0 0 0/ 0.4);
  background-color: #fff9;
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

const Error = styled(Typography)`
  color: red;
  font-size: 9px;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`
const Text = styled(Typography)`
  color: #fff9;
  font-size: 15px;
`;

const loginInitialValues = {
  username: " ",
  password: " "
};

const signupInitialValues = {
  name: " ",
  username: " ",
  password: " ",
};

const LoginForm = (props) => {
  const [account, toggleAccount] = useState("login");
  const [signup, setSignup] = useState(signupInitialValues);
  const [login, setLogin] = useState(loginInitialValues)
  const [error, setError] = useState('');

  const { setAccount } = useContext(DataContext);

  const navigate = useNavigate();
  
  const { isUserAuthenticated } = props;

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };

  const signupUser = async () => {
    let res = await API.userSignup(signup);
    if(res.isSuccess){
      setError('');
      setSignup(signupInitialValues);
      toggleAccount('login');
    } else {
      setError('Something went wrong! Please try again.');
    }
  };

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]:e.target.value});
  }

  const userLogin = async () => {
    let res = await API.userLogin(login);
    if(res.isSuccess){
      setError('');

      sessionStorage.setItem('accessToken', `Bearer ${res.data.accessToken}`);
      sessionStorage.setItem('refreshToken', `Bearer ${res.data.refreshToken}`);

      setAccount({username: res.data.username, name: res.data.password})

      navigate('/');

      isUserAuthenticated(true);
    } else {
      setError('Something went wrong! Please try again.');
    }
  }

  return (
    <Component> 
      <Box style={{ margin: 50 }}>
        <Wrapper>
          <Image src={bloggerImg} alt="blogger" />
          <Image
            src={diarySpaceImg}
            style={{ filter: "invert(100%)" }}
            alt="DiarySpace"
          />
          <Text style={{ textAlign: "center" }}>Create Your Space</Text>
        </Wrapper>
        {account === "login" ? (
          <Wrapper>
            <TextField
              variant="standard"
              name="username"
              label="Enter Username"
              onChange={(e) => onValueChange(e)}
            />
            <TextField
              variant="standard"
              name="password"
              type="password"
              label="Enter Password"
              onChange={(e) => onValueChange(e)}
            />
             { error && <Error>{error}</Error> }
            <LoginButton variant="contained" onClick={ () => userLogin () } >Login</LoginButton>
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
            <TextField
              variant="standard"
              onChange={(e) => onInputChange(e)}
              name="name"
              label="Enter Name"
            />
            <TextField
              variant="standard"
              onChange={(e) => onInputChange(e)}
              name="username"
              label="Enter Username"
            />
            <TextField
              variant="standard"
              onChange={(e) => onInputChange(e)}
              name="password"
              type="password"
              label="Enter Password"
            />

             <SignupButton onClick={() => signupUser()}>Signup</SignupButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <LoginButton variant="contained" onClick={toggleSignup}>
              Already have an account?
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default LoginForm;
