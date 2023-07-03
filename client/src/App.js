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
import Update from "./components/create/Update";
import DetailView from "./components/details/DetailView";

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ?
    <>
      <Header /> 
      <Outlet />
    </>
  :
    <Navigate replace to="/account" />
};

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route
            path="/account"
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
          <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/update/:id' element={<Update/> } />
            </Route>
            <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/details/:id' element={<DetailView/> } />
            </Route>
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
