import LOGO from "../assets/logo.png";
import { BiMenu } from "react-icons/bi";
import { useContext, useState } from "react";
import { CgClose } from "react-icons/cg";
import { DataContext } from "../context/DataContext";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  const { account, toggle, setToggle } = useContext(DataContext);
  const [profileMenuToggle, setProfileMenuToggle] = useState(false);
  return (
    <>
      <div className="fixed w-screen bg-sky-950 p-5">
        <div className="flex justify-between align-middle">
          <div className="flex">
            <img src={LOGO} alt="diaryspace-logo" className="w-[12rem]" />
            {toggle ? (
              <CgClose
                className="text-2xl text-white cursor-pointer"
                onClick={() => {
                  setToggle(!toggle);
                }}
              />
            ) : (
              <BiMenu
                className="text-2xl text-white cursor-pointer"
                onClick={() => {
                  setToggle(!toggle);
                }}
              />
            )}
          </div>
          <div className="flex justify-center items-center cursor-pointer">
          {
            profileMenuToggle ? <CgClose className="text-xl text-white" onClick={() => setProfileMenuToggle(!profileMenuToggle)}/>
             : <span className="rounded-full px-2 bg-orange-700 text-white uppercase" onClick={() => setProfileMenuToggle(!profileMenuToggle)}>
              {account.username[0]}
            </span>
            
          }
          </div>
        </div>
      </div>
      {profileMenuToggle ? <ProfileMenu /> : null}
    </>
  );
};

export default Navbar;
