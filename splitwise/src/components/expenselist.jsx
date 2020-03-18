import React from "react";
import ExpenseName from "./expensename";
import ExpenseYouPaid from "./expenseyoupaid";
import ExpenseYouLent from "./expenseyoulent";
import axios from "axios";

function ExpenseList(props) {
  const deleteExpense = (currentExpense, grpExpense) => {
    let lent = currentExpense["you_lent"];
    let totalOwed = grpExpense.tot_owed;
    let grpFriends = grpExpense.friends;
    let memCount = currentExpense["mem_count"];
    let expenseId = currentExpense["id"];
    totalOwed = Number(Number(totalOwed) - Number(lent)).toFixed(2);
    let perLent = Number((lent / memCount).toFixed(2));

    for (let i = 0; i < grpFriends.length; i++) {
      if (expenseId >= grpFriends[i]["from_expense"]) {
        if (grpFriends[i]["tot_owes"] > 0) {
          grpFriends[i]["tot_owes"] = Number(
            (grpFriends[i]["tot_owes"] - perLent).toFixed(2)
          );
          if (grpFriends[i]["tot_owes"] <= 0) {
            grpFriends[i]["tot_owes"] = 0;
          }
        }
      }
    }

    let mutatedExpense = new FormData();

    mutatedExpense.append("totalOwed", totalOwed);
    mutatedExpense.append("grpFriends", JSON.stringify(grpFriends));
    mutatedExpense.append("currentExpense", JSON.stringify(currentExpense));

    alert("Expense Deleted!");

    axios({
      method: "post",
      url: "/app/delete/expense",
      data: mutatedExpense,
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(response => console.log(response.data))
      .catch(error => console.log(error));
  };

  return (
    <React.Fragment>
      <div className="add_expense summary">
        <div className="main-block">
          <div className="date">
            {props.current_expense_data["on_month"]}
            <div className="number">
              {props.current_expense_data["on_date"]}
            </div>
          </div>
          <div className="header_name">
            <ExpenseName
              key={props.id}
              expenseName={props.current_expense_data.name}
            />
          </div>
        </div>
        <div className="cost">
          you paid <br />{" "}
          <ExpenseYouPaid
            key={props.id}
            youPaid={props.current_expense_data.you_paid}
          />
        </div>
        <div className="you">
          you lent <br />
          <ExpenseYouLent
            key={props.id}
            youLent={props.current_expense_data.you_lent}
          />
        </div>
        <div className="delete_actions">
          <a
            href="/dashboard"
            className="delete"
            onClick={() =>
              deleteExpense(
                props.current_expense_data,
                props.current_group_data
              )
            }
          >
            x
          </a>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ExpenseList;
