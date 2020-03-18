import React, { Component } from "react";
import LeftPanel from "./leftpanel";
import RightPanel from "./rightpanel";
import AddExpense from "./addexpense";
//import Settleup from "./settleup";
import ExpenseList from "./expenselist";
import AddFriends from "./addfriends";
import FriendOwesDetails from "./friendowesdetails";
import axios from "axios";
import auth from "../auth";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

class CenterPanel extends Component {
  _isMounted = false;

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  state = {
    showAddExpenseModal: false,
    showSettleupModal: false,
    showAddFrndsModal: false,
    showFrndOwesModal: false,
    group_data: [],
    current_group_data: { expenses: [], friends: [] },
    friendOwesToGrps: {}
  };

  componentDidMount() {
    console.log("Mounted");
    this._isMounted = true;
    this.getGroupExpense();
  }

  componentDidUpdate() {
    console.log("Updated");
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  currentGrpSwitch = groups => {
    if (auth.getCurrentGrpSwitch()) {
      for (let group of groups) {
        if (group.name === auth.getCurrentGrpSwitch()) {
          this.setState({
            current_group_data: group,
            group_data: groups
          });
          break;
        }
      }
    } else {
      this.setState({
        current_group_data: groups[0],
        group_data: groups
      });
    }
  };

  getGroupExpense = () => {
    const { history } = this.props;

    const currentUser = new FormData();
    currentUser.append("created_by", sessionStorage.getItem("LoggedInUser"));
    axios({
      method: "post",
      url: "/app/user/groups",
      data: currentUser,
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(response => {
        console.log(response.data.groups);
        console.log(response.data.groups[0]);

        if (!response.data.groups[0]) {
          alert("You haven't created any group yet...");
          history.push("/addgroup");
        }
        if (this._isMounted) {
          this.currentGrpSwitch(response.data.groups);
        }
      })
      .catch(error => console.log(error));
  };

  setAddExpenseModalShow = e => {
    this.setState({
      showAddExpenseModal: e
    });
    this.getGroupExpense();
  };

  setSettleupModalShow = e => {
    this.setState({ showSettleupModal: e });
  };

  setAddFrndsModalShow = e => {
    this.setState({
      showAddFrndsModal: e
    });
    this.getGroupExpense();
  };

  setFrndOwesModalShow = e => {
    this.setState({
      showFrndOwesModal: e
    });
  };

  display_data = group_data => {
    auth.setCurrentGrpSwitch(group_data.name);
    this.setState({
      current_group_data: group_data
    });
  };

  displayExpenses = () => {
    let expenseList = [];
    for (let i = 0; i < this.state.current_group_data.expenses.length; i++) {
      expenseList.push(
        <ExpenseList
          key={i}
          id={i}
          current_group_data={this.state.current_group_data}
          current_expense_data={this.state.current_group_data.expenses[i]}
        />
      );
    }
    return expenseList;
  };

  displayFrndDetails = frndData => {
    this.setFrndOwesModalShow(true);
    console.log(frndData);
    this.setState({ friendOwesToGrps: frndData });
  };

  render() {
    console.log("Rendered");
    return (
      <React.Fragment>
        <div id="centerpanel">
          <LeftPanel
            group_data={this.state.group_data}
            handleClick={this.display_data}
            setAddFrndsModalShow={this.setAddFrndsModalShow}
            displayFrndDetails={this.displayFrndDetails}
          />
          {<RightPanel current_group_data={this.state.current_group_data} />}
          <div id="centercolumn">
            <div className="topbar">
              <h4>{this.state.current_group_data.name}</h4>
              <div className="actions">
                <button
                  className="button expense"
                  onClick={() => this.setAddExpenseModalShow(true)}
                >
                  Add an expense
                </button>
                {/*<button
                  className="button settleup"
                  onClick={() => this.setSettleupModalShow(true)}
                >
                  Settle up
                </button>*/}
              </div>
            </div>
            <div id="expenses">
              <div id="expenseslist">
                {/*<div id="no_expense_desc">
                  <img
                    className="no_expense_toy"
                    src="https://dx0qysuen8cbs.cloudfront.net/assets/fat_rabbit/empty-table-effed2a2e610373b6407d746cb95858f5d47329c8610bb70f1fd2040dfa35165.png"
                    alt=""
                  />
                  <div className="no_expense_content">
                    <h5>You have not added any expenses yet</h5>
                    <p className="sub_content">
                      To add a new expense, click the orange “Add an expense”
                      button.
                    </p>
                  </div>
    </div>*/}
                <div className="add_expense">
                  <div className="summary">{this.displayExpenses()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AddExpense
          show={this.state.showAddExpenseModal}
          onHide={() => this.setAddExpenseModalShow(false)}
          group_name={this.state.current_group_data.name}
          current_data={this.state.current_group_data}
        />
        <AddFriends
          show={this.state.showAddFrndsModal}
          onHide={() => this.setAddFrndsModalShow(false)}
          current_data={this.state.current_group_data}
        />
        <FriendOwesDetails
          show={this.state.showFrndOwesModal}
          onHide={() => this.setFrndOwesModalShow(false)}
          group_data={this.state.group_data}
          owes_to_grps={this.state.friendOwesToGrps}
        />

        {/*<Settleup
          show={this.state.showSettleupModal}
          onHide={() => this.setSettleupModalShow(false)}
        />*/}
      </React.Fragment>
    );
  }
}

export default withRouter(CenterPanel);
