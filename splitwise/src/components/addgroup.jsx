import React, { Component } from "react";
import TeamMemberList from "./team_member_list";
import axios from "axios";

class AddGroup extends Component {
  state = {
    group_name: "",
    members_count: 0,
    created_by: sessionStorage.getItem("LoggedInUser"),
    friends_name: [],
    owed: 0,
    expenses: []
  };

  setCount = e => {
    this.setState({ members_count: this.refs.team_no.value });
  };

  create_fields() {
    let field = [];

    for (let index = 0; index < this.state.members_count; index++) {
      field.push(<TeamMemberList key={index} id={index} />);
    }
    return field;
  }

  handleGroupName = e => {
    this.setState({ group_name: e.target.value });
  };

  setFriends = friends => {
    this.setState({ friends_name: friends }, async () => {
      let grpData = new FormData();
      grpData.append("name", this.state.group_name);
      grpData.append("mem_count", this.state.members_count);
      grpData.append("created_by", this.state.created_by);
      grpData.append("tot_owed", this.state.owed);

      let grpFrndsData = new FormData();
      console.log(friends);
      grpFrndsData.append("friends", JSON.stringify(friends));
      grpFrndsData.append("group_name", this.state.group_name);
      grpFrndsData.append("created_by", this.state.created_by);

      await axios({
        method: "post",
        url: "app/add/groups",
        data: grpData,
        headers: { "Content-Type": "multipart/form-data" }
      })
        .then(response => console.log(response))
        .catch(error => console.log(error));

      await axios({
        method: "post",
        url: "app/add/friends",
        data: grpFrndsData,
        headers: { "Content-Type": "multipart/form-data" }
      })
        .then(response => console.log(response))
        .catch(error => console.log(error));

      this.props.history.push("/dashboard");
    });
  };

  createGroup = e => {
    e.preventDefault();
    let friends = [];
    let friend_details = {};

    for (let i = 0; i < this.state.members_count; i++) {
      friend_details["from_expense"] = 1;
      friend_details["name"] = document.getElementById(i).value;
      friend_details["owes"] = 0;
      friends.push(friend_details);
      friend_details = {};
    }
    this.setFriends(friends);
  };

  render() {
    return (
      <div>
        <form>
          <center>
            <h2>
              <label>My Group shall be called as...</label>
            </h2>
            <input
              type="text"
              name="group_name"
              placeholder="Group Name"
              style={{ width: "50%" }}
              onChange={this.handleGroupName}
            />
            <hr />
            <label>No. of members: </label>
            <input type="text" ref="team_no" />
            <button
              type="button"
              className="btn btn-info"
              onClick={this.setCount}
            >
              Add Friends!
            </button>
            <hr />
            {this.create_fields()}
            <br />
            <br />
            <button
              type="submit"
              onClick={this.createGroup}
              className="btn btn-info"
            >
              Create Group!
            </button>
            <hr />
          </center>
        </form>
      </div>
    );
  }
}

export default AddGroup;
