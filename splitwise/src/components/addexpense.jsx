import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

class AddExpense extends Component {
  getMonth() {
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    return months[new Date().getMonth()];
  }

  addExpense = () => {
    let expenseName = this.refs.description.value;
    let totalAmount = Number(this.refs.amount.value);
    let { mem_count } = this.props.current_data;
    let amountPerHead = Number((totalAmount / (mem_count + 1)).toFixed(2));

    let expenseData = new FormData();
    expenseData.append("mem_count", mem_count);
    expenseData.append("name", expenseName);
    expenseData.append("you_paid", totalAmount);
    let youLent = Number((totalAmount - amountPerHead).toFixed(2));
    expenseData.append("you_lent", youLent);
    expenseData.append("on_month", this.getMonth());
    expenseData.append("on_date", new Date().getDate());
    expenseData.append("groups_id", this.props.current_data.id);

    let friendsOwe = amountPerHead;
    let userOwed = Number((totalAmount - amountPerHead).toFixed(2));

    expenseData.append("tot_owes", friendsOwe);
    expenseData.append("tot_owed", userOwed);

    axios({
      method: "post",
      url: "/app/add/expense",
      data: expenseData,
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(response => console.log(response))
      .catch(error => console.log(error));

    alert("Expense Added!");
    this.refs.description.value = "";
    this.refs.amount.value = "";
  };

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add expense
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h6>
              With{" "}
              <b>
                <i>you</i>
              </b>{" "}
              and all of:{" "}
              <b>
                <i>{this.props.group_name}</i>
              </b>
            </h6>
          </div>
          <div>
            <center>
              <span style={{ marginRight: "20px" }}>
                <i className="fa fa-arrow-down"></i>
              </span>
              <label>
                <i>Enter a description</i>
              </label>
            </center>
            <center>
              <input type="text" placeholder="Description" ref="description" />
            </center>
            <center>
              <input type="text" placeholder="Amount in Rs." ref="amount" />
            </center>
            <center>
              <label>
                <i>Enter amount</i>
              </label>{" "}
              <span style={{ marginLeft: "60px" }}>
                <i className="fa fa-arrow-up"></i>
              </span>
            </center>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.addExpense}>Add</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddExpense;
