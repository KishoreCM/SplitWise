import React from "react";

function GroupTags(props) {
  return (
    <a
      /*href="/dashboard"*/
      className="group_name open"
      onClick={() => props.handleClick(props.group_data)}
    >
      <i className="fa fa-tag"></i> {props.groupTags}
    </a>
  );
}

export default GroupTags;
