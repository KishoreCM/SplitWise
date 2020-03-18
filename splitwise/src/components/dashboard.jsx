import React from "react";
import Navbar from "./navbar";
import CenterPanel from "./centerpanel";
import AddExpense from "./addexpense";
//import Settleup from "./settleup";
//import auth from "../auth";

function DashBoard() {
  return (
    <div className="dashboardBody">
      <Navbar />
      <div id="center_container">
        <CenterPanel />
      </div>

      <AddExpense />
      {/*<Settleup />*/}
    </div>
  );
}

export default DashBoard;
