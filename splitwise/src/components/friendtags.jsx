import React from "react";

function FriendName(props) {
  return (
    <div>
      <a
        /*href="www.splitwise.com"*/ className="group_name"
        onClick={() => props.handleClick(props.data)}
      >
        <i className="fa fa-user"></i> {props.data.name}
      </a>
    </div>
  );
}

function FriendTags(props) {
  const displayFriends = () => {
    let friendsName = [];
    for (let i = 0; i < props.grpFriends.length; i++) {
      friendsName.push(
        <FriendName
          key={i}
          data={props.grpFriends[i]}
          handleClick={props.handleClick}
        />
      );
    }
    return friendsName;
  };

  return <React.Fragment>{displayFriends()}</React.Fragment>;
}

export default FriendTags;
