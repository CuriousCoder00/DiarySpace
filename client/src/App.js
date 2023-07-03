import DataProvider from "./context/DataProvider";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "./components/account/Login";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import { useState } from "react";
import CreatePost from "./components/create/CreatePost";

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ?
    <>
      <Header /> 
      <Outlet />
    </>
  :
    <Navigate replace to="/login" />
};

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={<Login isUserAuthenticated={isUserAuthenticated} />}
          />
          <Route
             path="/"
            element={<PrivateRoute isAuthenticated={isAuthenticated} />}
          >
            <Route  path="/" element={<Home />} />
          </Route>
          <Route
             path="/"
            element={<PrivateRoute isAuthenticated={isAuthenticated} />}
          >
            <Route  path="/create" element={<CreatePost/>} />
          </Route>
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
