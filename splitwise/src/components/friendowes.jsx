import React from "react";

function FriendOwes(props) {
  return (
    <div className="personal_balance i_owe">
      owes <span className="amount">Rs.{props.friend_owes}</span>
    </div>
  );
}

export default FriendOwes;
