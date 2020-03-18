import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

class AddFriends extends Component {
  addFriend = () => {
    let currentGrpData = this.props.current_data;
    let newFriendName = this.refs.friendName.value;
    let newFriendDetail = new FormData();

    newFriendDetail.append(
      "from_expense",
      currentGrpData.expenses[currentGrpData.expenses.length - 1].id + 1
    );
    newFriendDetail.append("name", newFriendName);
    newFriendDetail.append("tot_owes", 0);
    currentGrpData.mem_count = Number(currentGrpData.mem_count) + 1;
    newFriendDetail.append("groupID", currentGrpData.id);
    newFriendDetail.append("mem_count", currentGrpData.mem_count);

    axios({
      method: "post",
      url: "/app/group/add/friend",
      data: newFriendDetail,
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(response => console.log(response.data))
      .catch(error => console.log(error));

    alert("New Friend Added!");
    this.refs.friendName.value = "";
  };

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Friends
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <center>
            <span>
              <label style={{ paddingRight: "10px" }}>
                <i>
                  <b>Name:</b>
                </i>
              </label>
              <input type="text" placeholder="Friend's Name" ref="friendName" />
            </span>
          </center>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.addFriend}>Add</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddFriends;
