import React from "react";

function ExpenseYouLent(props) {
  return <span className="positive">Rs. {props.youLent}</span>;
}

export default ExpenseYouLent;
