import React, { Component } from "react";
import { Link } from "react-router-dom";
import applogo from "../splitwiselogo-01.png";
import axios from "axios";

class SignUpForm extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    password: "",
    nameError: "",
    emailError: "",
    phoneError: "",
    passwordError: "",
    groups: []
  };

  onNameChange = e => {
    this.setState({ name: e.target.value });
  };

  onEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  onPhoneChange = e => {
    this.setState({ phone: e.target.value });
  };

  onPassTyped = e => {
    this.setState({ password: e.target.value });
    //console.log(this.state);
  };

  alreadyUser = prevUsers => {
    const currentUser = this.state;
    const userAlready = prevUsers.filter(
      user => user.email === currentUser.email
    );
    //console.log(userAlready);
    return userAlready[0] === undefined ? false : true;
  };

  validateForm() {
    let error = false;
    let emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let phRegEx = /^\d{10}$/;

    this.setState({
      nameError: "",
      emailError: "",
      phoneError: "",
      passwordError: ""
    });

    if (!this.state.name) {
      this.setState({ nameError: "Name cannot be empty" });
      error = true;
    }

    if (!emailRegEx.test(this.state.email)) {
      this.setState({ emailError: "Enter a valid Email address" });
      error = true;
    }

    if (!phRegEx.test(this.state.phone)) {
      this.setState({ phoneError: "Phone number isn't valid" });
      error = true;
    }

    if (this.state.password.length < 5) {
      this.setState({ passwordError: "Password atleast must be of length 5" });
      error = true;
    }

    return error ? true : false;
  }

  submitDetails = e => {
    e.preventDefault();

    if (!this.validateForm()) {
      let getPrevUsers;
      axios
        .get("/app/get/users")
        .then(response => {
          console.log("Response Received: ", response.data.users);
          if (response.data.users[0]) {
            getPrevUsers = response.data.users;
          }
          console.log("Prev users: ", getPrevUsers);
          let alreadyUser = !getPrevUsers
            ? false
            : this.alreadyUser(getPrevUsers);
          console.log("Already user?..." + alreadyUser);
          if (alreadyUser) {
            alert(
              "The user with this credentials is been registered already. Try loggin in..."
            );
          } else {
            let formData = new FormData();
            formData.append("name", this.state.name);
            formData.append("email", this.state.email);
            formData.append("phone", this.state.phone);
            formData.append("password", this.state.password);
            axios({
              method: "post",
              url: "app/add/users",
              data: formData,
              headers: { "Content-Type": "multipart/form-data" }
            })
              .then(response => {
                //handle success
                console.log(response);
                alert("Successfully Registered");
              })
              .catch(response =>
                //handle error
                console.log(response)
              );
          }

          this.setState({
            name: "",
            email: "",
            phone: "",
            password: ""
          });

          this.props.history.push("/login");
        })
        .catch(error => console.log(error));
    }
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
                <label>Name</label>
                <input
                  type="text"
                  value={this.state.name}
                  className="form-control"
                  onChange={this.onNameChange}
                  placeholder="Your Name"
                />
              </div>
              <div className="panel">{this.state.nameError}</div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={this.state.email}
                  className="form-control"
                  onChange={this.onEmailChange}
                  placeholder="Your Email"
                />
              </div>
              <div className="panel">{this.state.emailError}</div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={this.state.phone}
                  className="form-control"
                  onChange={this.onPhoneChange}
                  placeholder="Your Number"
                />
              </div>
              <div className="panel">{this.state.phoneError}</div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={this.state.password}
                  className="form-control"
                  onChange={this.onPassTyped}
                  placeholder="Your Password"
                />
              </div>
              <div className="panel">{this.state.passwordError}</div>

              <button
                type="submit"
                className="btn btn-primary btn-block"
                onClick={this.submitDetails}
              >
                Sign Up
              </button>
            </form>
            <br />
            <center>
              <Link to="/login">Already have an account?, Log In!</Link>
            </center>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SignUpForm;
