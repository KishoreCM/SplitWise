import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class OwesInEachGrp extends Component {
  render() {
    return (
      <span>
        <h4>
          In
          <i
            style={{
              padding: "10px",
              color: "#5bc5a7",
              fontWeight: "bold"
            }}
          >
            {this.props.in_grp}
          </i>
          -
          <span
            style={{
              color: "#ff652f",
              padding: "10px",
              fontSize: "20px"
            }}
          >
            Owes you Rs.{this.props.owes}
          </span>
        </h4>
      </span>
    );
  }
}

class FriendOwesDetails extends Component {
  displayFrndOwesToGrps = () => {
    let owesInGprs = [];
    if (this.props.owes_to_grps.belongsTo) {
      for (let i = 0; i < this.props.owes_to_grps.belongsTo.length; i++) {
        let group = this.props.group_data.filter(
          grp => grp.id === this.props.owes_to_grps.belongsTo[i]
        );
        for (let j = 0; j < group[0].friends.length; j++) {
          if (this.props.owes_to_grps.name === group[0].friends[j]["name"]) {
            owesInGprs.push(
              <OwesInEachGrp
                key={i + "" + j}
                in_grp={group[0].name}
                owes={group[0].friends[j]["tot_owes"]}
              />
            );
          }
        }
      }
      return owesInGprs;
    }
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
            {this.props.owes_to_grps.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <center>{this.displayFrndOwesToGrps()}</center>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>OK</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default FriendOwesDetails;
