class Auth {
  login(user, callback) {
    //this.authenticated = true;
    sessionStorage.setItem("LoggedInUser", user);
    callback();
  }

  logout() {
    //this.authenticated = false;
    sessionStorage.removeItem("LoggedInUser");
    sessionStorage.removeItem("current_grp_switch");
    //callback();
  }

  isAuthenticated() {
    let authenticated = sessionStorage.getItem("LoggedInUser");
    return authenticated;
  }

  getCurrentGrpSwitch() {
    return sessionStorage.getItem("current_grp_switch");
  }

  setCurrentGrpSwitch(groupName) {
    sessionStorage.setItem("current_grp_switch", groupName);
  }
}

export default new Auth();
