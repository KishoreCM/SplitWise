import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../auth";
import applogo from "../splitwiselogo-01.png";
import axios from "axios";

class LogInForm extends Component {
  state = {
    userMail: "",
    userPass: "",
    loginError: ""
  };

  handleMail = e => {
    this.setState({ userMail: e.target.value });
  };

  handlePass = e => {
    this.setState({ userPass: e.target.value });
  };

  isAuthorised = e => {
    e.preventDefault();

    this.setState({ loginError: "" });

    let { userMail } = this.state;
    let { userPass } = this.state;
    let registeredUsers;
    let isRegistered;

    axios
      .get("/app/get/users")
      .then(response => {
        registeredUsers = response.data.users;

        isRegistered = registeredUsers.filter(
          user => user.email === userMail && user.password === userPass
        );

        if (isRegistered[0] === undefined) {
          this.setState({ loginError: "Invalid Mail or Password :(" });
        } else {
          auth.login(userMail, () => this.props.history.push("/dashboard"));
        }
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <React.Fragment>
        <center>
          <img src={applogo} alt="SplitWise Logo" />
        </center>
        <div className="form">
          <div className="container">
            <form>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={this.state.userMail}
                  onChange={this.handleMail}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={this.state.userPass}
                  onChange={this.handlePass}
                />
              </div>
              <div className="panel">{this.state.loginError}</div>
              <button
                type="submit"
                className="btn btn-primary btn-block"
                onClick={this.isAuthorised}
              >
                Log In
              </button>
            </form>
            <br />
            <center>
              <Link to="/">Don't have an account?, Sign Up!</Link>
            </center>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LogInForm;
