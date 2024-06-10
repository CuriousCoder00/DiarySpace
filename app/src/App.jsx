import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import DataProvider from "./context/DataProvider";
import Account from "./pages/Account";

// eslint-disable-next-line react/prop-types, no-unused-vars
const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? (
    <>
      <Navbar />
      <div className="flex">
        <div>
          <Sidebar />
        </div>
        <div className="flex p-4 w-full rounded pt-7 h-screen overflow-auto">
          <Outlet />
        </div>
      </div>
    </>
  ) : (
    <Navigate replace to="/account" />
  );
};

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route
            path="/account"
            element={<Account isUserAuthenticated={isUserAuthenticated} />}
          />
          <Route
            path="/"
            element={<PrivateRoute isAuthenticated={isAuthenticated} />}
          >
            <Route path="/" element={<Home />} />
          </Route>{" "}
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
