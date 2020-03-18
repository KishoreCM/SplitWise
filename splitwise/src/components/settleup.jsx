import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class Settleup extends Component {
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
            Settle up
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <b>
            <i>You</i>
          </b>{" "}
          paid{"  "}
          <input list="friends" name="friend" />
          <datalist id="friends">
            <option value="Dhayal" />
            <option value="Karthick" />
            <option value="Vishnu" />
          </datalist>
        </Modal.Body>
        <Modal.Footer>
          <Button>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Settleup;
