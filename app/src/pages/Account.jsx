import { useState } from "react";
import bloggerImage from "../assets/blogger.png";
import diarySpaceImage from "../assets/logo.png";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

const Account = (props) => {
  const [account, toggleAccount] = useState("login");
  // eslint-disable-next-line react/prop-types
  const { isUserAuthenticated } = props;

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="w-[450px] p-5 shadow-lg shadow-sky-500 bg-sky-900 rounded-md">
        <div className="flex justify-center flex-col items-center">
          <img src={bloggerImage} alt="blogger-image" className="w-20" />
          <img src={diarySpaceImage} alt="diary-space-image" className="" />
          <span className="text-slate-300">Create your space</span>
        </div>
        {account === "login" ? (
          <LoginForm isUserAuthenticated={isUserAuthenticated} />
        ) : (
          <SignUpForm toggleAccount={toggleAccount}/>
        )}
        {/* {error && <Error>{error}</Error>} */}
        <div className="flex justify-center items-center text-slate-200 text-sm">
          {account === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <span
            className="hover:text-sky-300 text-slate-200 cursor-pointer hover:underline"
            onClick={() =>
              toggleAccount(account === "login" ? "signup" : "login")
            }
          >
            {account === "login" ? " Register" : " Login"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Account;
