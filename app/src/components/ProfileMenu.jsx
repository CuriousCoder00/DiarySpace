import { DataContext } from "../context/DataContext";
import { useContext } from "react";
import { API } from "../services/Api";

const ProfileMenu = () => {
  const { account } = useContext(DataContext);
  const userLogout = () => {
    API.userLogout();
    window.location.reload();
  };
  return (
    <div className="absolute top-14 right-5 p-2 bg-white rounded shadow-xl">
      <div className="flex flex-col gap-3">
      <div className="hover:bg-slate-300 p-2 rounded-md cursor-pointer">

        {account.username}
      </div>
      <div className="hover:bg-slate-300 p-2 rounded-md text-sky-900 cursor-pointer" onClick={userLogout}>
        Logout
      </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
