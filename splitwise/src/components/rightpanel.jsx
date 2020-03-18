import React from "react";
import FriendName from "./friendname";
import FriendOwes from "./friendowes";

function RightPanel(props) {
  return (
    <div id="rightpanel">
      <div className="right_panel_content">
        <div id="group_balances" className="active">
          <h6>GROUP BALANCES</h6>
          <div className="group_summary">
            <div className="members">
              {props.current_group_data.friends.map((f, index) => (
                <React.Fragment key={"friend_balance" + index}>
                  <FriendName
                    key={"friend_" + index}
                    id={index}
                    friend_name={f["name"]}
                  />
                  <FriendOwes
                    key={"owes_" + index}
                    id={index}
                    friend_owes={f["tot_owes"]}
                  />
                </React.Fragment>
              ))}
              {/*<div className="personal_balance">Settled up</div>*/}

              {/*<div className="personal_balance owes_me">
                  gets back <span className="amount">$45.00</span>
    </div>*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightPanel;
