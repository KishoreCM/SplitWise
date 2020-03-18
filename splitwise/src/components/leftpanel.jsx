import React from "react";
import GroupTags from "./groupTags";
import FriendTags from "./friendtags";

function LeftPanel(props) {
  const displayGroups = () => {
    let groupTags = [];
    if (props.group_data) {
      for (var i = 0; i < props.group_data.length; i++) {
        groupTags.push(
          <GroupTags
            key={i}
            id={i}
            groupTags={props.group_data[i].name}
            group_data={props.group_data[i]}
            handleClick={props.handleClick}
          />
        );
      }
    }

    return groupTags;
  };

  const mapSimilarGrpMembers = () => {
    let belongsToGrps = [];

    console.log("Left panel: ", props.group_data);

    for (let i = 0; i < props.group_data.length; i++) {
      for (let j = 0; j < props.group_data[i].friends.length; j++) {
        if (
          !belongsToGrps.some(
            user => user.name === props.group_data[i].friends[j].name
          )
        ) {
          belongsToGrps.push({
            name: props.group_data[i].friends[j].name,
            belongsTo: [props.group_data[i].friends[j].groups_id]
          });
        } else {
          for (let k = 0; k < belongsToGrps.length; k++) {
            if (belongsToGrps[k].name === props.group_data[i].friends[j].name) {
              belongsToGrps[k].belongsTo.push(
                props.group_data[i].friends[j].groups_id
              );
              break;
            }
          }
        }
      }
    }

    console.log("belongsToGrps", belongsToGrps);
    return belongsToGrps;
  };

  const displayGrpFriends = () => {
    let belongsToGrps = mapSimilarGrpMembers();
    return (
      <FriendTags
        grpFriends={belongsToGrps}
        handleClick={props.displayFrndDetails}
      />
    );
  };

  return (
    <div id="leftpanel">
      <div id="view_options">
        <a /*href="www.splitwise.com"*/ id="dashboard_option">Dashboard</a>
        <div className="group_tags">
          <div className="header">
            GROUPS
            <a id="add_group" href="/addgroup">
              + Add
            </a>
          </div>

          {displayGroups()}
        </div>

        <div className="group_tags">
          <div className="header">
            FRIENDS
            <a
              style={{ cursor: "pointer" }}
              id="add_group"
              /*href="/addgroup"*/ onClick={() =>
                props.setAddFrndsModalShow(true)
              }
            >
              + Add Friends
            </a>
          </div>
          {displayGrpFriends()}
        </div>
      </div>
    </div>
  );
}

export default LeftPanel;
