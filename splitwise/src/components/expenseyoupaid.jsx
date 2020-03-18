import React from "react";

function ExpenseYouPaid(props) {
  return <span className="number">Rs. {props.youPaid}</span>;
}

export default ExpenseYouPaid;
