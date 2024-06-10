import { useContext } from "react";
import { CgAdd } from "react-icons/cg";
import { Link } from "react-router-dom";
import { DataContext } from "../context/DataContext";
const Sidebar = () => {
  const { toggle } = useContext(DataContext);
  return (
    <div
      className={` ${
        toggle ? "block" : "hidden"
      } flex flex-col gap-4 bg-sky-950 min-w-56 pt-20 h-screen p-3`}
    >
      <div className="text-lg w-full flex justify-center items-center p-2 rounded-md gap-2 font-semibold text-white bg-sky-700 uppercase hover:bg-sky-500 cursor-pointer">
        create post <CgAdd className="text-xl" />
      </div>
      <div className="flex flex-col mt-3 gap-2 items-center w-full">
        <Link
          to="/"
          className={`text-lg w-full flex justify-start items-center p-2 text-white bg-sky-900 uppercase hover:bg-sky-700 cursor-pointer hover:border-r-2 hover:border-r-sky-300 ${
            window.location.pathname === "/" &&
            "bg-sky-600 border-r-2 border-r-sky-300"
          }`}
        >
          Home
        </Link>

        <Link
          to="/about"
          className={`text-lg w-full flex justify-start items-center p-2 text-white hover:border-r-2  hover:border-r-sky-300  bg-sky-900 uppercase hover:bg-sky-700 cursor-pointer ${
            window.location.pathname === "/about" &&
            "bg-sky-600 border-r-2 border-r-sky-300"
          }`}
        >
          About
        </Link>

        <Link
          to="/contact"
          className={`text-lg w-full flex justify-start items-center p-2 text-white hover:border-r-2 hover:border-r-sky-300 bg-sky-900 uppercase hover:bg-sky-700 cursor-pointer ${
            window.location.pathname === "/contact" &&
            "bg-sky-600 border-r-2 border-r-sky-300"
          }`}
        >
          Contact
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
