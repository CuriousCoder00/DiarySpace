import { useState } from "react";
import { API } from "../services/Api";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const signupInitialValues = {
  name: " ",
  username: " ",
  password: " ",
};

const SignUpForm = (props) => {
  const [signup, setSignUp] = useState(signupInitialValues);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // eslint-disable-next-line react/prop-types
  const { toggleAccount } = props;
  const onInputChange = (e) => {
    setSignUp({ ...signup, [e.target.name]: e.target.value });
  };
  const signupUser = async () => {
    let res = await API.userSignup(signup);
    if (res.isSuccess) {
      setError("");
      setSignUp(signupInitialValues);
      toggleAccount("login");
    } else {
      setError("Something went wrong! Please try again.");
    }
  };
  return (
    <div className="flex justify-center w-full items-center flex-col my-3 gap-4">
      <div className="flex flex-col w-full text-slate-300">
        <label htmlFor="name">Name:</label>
        <input
          type="text" required
          name="name"
          placeholder="Enter Name"
          className="p-2 rounded focus:outline-none focus:shadow-sm w-full text-slate-700"
          onChange={(e) => onInputChange(e)}
        />
      </div>
      <div className="flex flex-col w-full text-slate-300">
        <label htmlFor="username">Username:</label>
        <input
          type="text" required
          name="username"
          placeholder="Enter Username"
          className="p-2 rounded focus:outline-none focus:shadow-sm w-full text-slate-700"
          onChange={(e) => onInputChange(e)}
        />
      </div>
      <div className="flex flex-col w-full text-slate-300">
        <label htmlFor="password">Password</label>
        <div className="flex items-center bg-white rounded-md w-full">
          <input required
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter Password"
            className="w-full p-2 rounded focus:outline-none focus:shadow-sm text-slate-700"
            onChange={(e) => onInputChange(e)}
          />
          {showPassword ? (
            <BsEyeSlash
              className="text-slate-700 text-xl mx-2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <BsEye
              className="text-slate-700 text-xl mx-2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
      </div>
      {error && <span className="text-red-400 text-sm">{error}</span>}
      <button
        onClick={() => signupUser()}
        className="w-full p-2 border border-white hover:border-blue-700 hover:bg-none bg-sky-800 hover:cursor-pointer hover:bg-blue-700 text-white rounded-md mt-4"
      >
        Sign Up
      </button>
    </div>
  );
};

export default SignUpForm;
