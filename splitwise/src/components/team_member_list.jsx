import React from "react";

function TeamMemberList(props) {
  const style = {
    paddingTop: "10px",
    paddingBottom: "10px",
    marginTop: "2px"
  };
  return (
    <React.Fragment>
      <input type="text" placeholder="Enter name" id={props.id} style={style} />
      <br />
      <br />
    </React.Fragment>
  );
}

export default TeamMemberList;
