import { useState } from "react";
import { DataContext } from "./DataContext";

// eslint-disable-next-line react/prop-types
const DataProvider = ({ children }) => {
  const [account, setAccount] = useState({ name: "", username: "" });
  const [toggle, setToggle] = useState(false);


  return (
    <DataContext.Provider
      value={{
        account,
        setAccount,
        toggle,
        setToggle,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
