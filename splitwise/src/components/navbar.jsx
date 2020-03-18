import React from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import auth from "../auth";

function Navbar() {
  const getUserName = () => {
    return sessionStorage.getItem("LoggedInUser");
  };

  return (
    <React.Fragment>
      <div className="navbar">
        <div className="container">
          <div>
            <img
              className="logoimg"
              src="https://dx0qysuen8cbs.cloudfront.net/assets/core/logo-wordmark-horizontal-white-short-c309b91b96261a8a993563bdadcf22a89f00ebb260f4f04fd814c2249a6e05d4.svg"
              alt=""
            />
          </div>
          {/*<div className="userName">
              Kishore Raj<b className="caret"></b>
            </div>*/}
        </div>
        <DropdownButton id="dropdown-basic-button" title={getUserName()}>
          <Dropdown.Item href="/login" onClick={() => auth.logout()}>
            Logout
          </Dropdown.Item>
        </DropdownButton>
      </div>
      {/*
        <div>
            <button
              className="btn btn-primary"
              onClick={() => {
                auth.logout(() => this.props.history.push("/login"));
              }}
            >
              Logout
            </button>
        </div>
            */}
    </React.Fragment>
  );
}

export default Navbar;
