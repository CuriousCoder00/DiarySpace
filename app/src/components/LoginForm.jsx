import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../services/Api";
import { DataContext } from "../context/DataContext";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const loginInitialValues = {
  username: " ",
  password: " ",
};

const LoginForm = (props) => {
  const [login, setLogin] = useState(loginInitialValues);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  // eslint-disable-next-line react/prop-types
  const { isUserAuthenticated } = props;

  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();
  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const userLogin = async () => {
    let res = await API.userLogin(login);
    if (res.isSuccess) {
      setError("");

      sessionStorage.setItem("accessToken", `Bearer ${res.data.accessToken}`);
      sessionStorage.setItem("refreshToken", `Bearer ${res.data.refreshToken}`);

      setAccount({ username: res.data.username, name: res.data.password });

      navigate("/");

      isUserAuthenticated(true);
    } else {
      setError("Something went wrong! Please try again.");
    }
  };
  return (
    <div className="flex justify-center w-full items-center flex-col my-3 gap-4">
      <div className="flex flex-col w-full text-slate-300">
        <label htmlFor="username">Username:</label>
        <input
          type="text" required
          name="username"
          placeholder="Enter Username"
          className="p-2 rounded focus:outline-none focus:shadow-sm w-full text-slate-700"
          onChange={(e) => onValueChange(e)}
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
            onChange={(e) => onValueChange(e)}
          />
          {showPassword ? <BsEyeSlash className="text-slate-700 text-xl mx-2 cursor-pointer" onClick={() => setShowPassword(!showPassword)}/> : <BsEye className="text-slate-700 text-xl mx-2 cursor-pointer" onClick={() => setShowPassword(!showPassword)}/>}
          
        </div>
      </div>
      {error && <span className="text-red-400 text-sm">{error}</span>}
      <button
        onClick={() => userLogin()}
        className="w-full p-2 border border-white hover:border-blue-700 hover:bg-none bg-sky-800 hover:cursor-pointer hover:bg-blue-700 text-white rounded-md mt-4"
      >
        Login
      </button>
    </div>
  );
};

export default LoginForm;
