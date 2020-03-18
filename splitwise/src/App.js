import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom";
import LogInForm from "./components/loginform";
import SignUpForm from "./components/signupform";
import DashBoard from "./components/dashboard";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import { ProtectedRoute } from "./components/protectedroute.js";
import AddGroup from "./components/addgroup.jsx";
//import "../node_modules/bulma/css/bulma.min.css";
import "../node_modules/react-bootstrap/ModalHeader";

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={SignUpForm} />
        <Route path="/login" component={LogInForm} />
        <ProtectedRoute path="/dashboard" component={DashBoard} />
        <ProtectedRoute path="/addgroup" component={AddGroup} />
        <Route path="*" component={() => "404. Page not found..."} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
