import React, { Component } from "react";
import { Card, CardTitle, CardBody } from "reactstrap";
// import StaffDetail from "./StaffDetailComponent";
import { Button, ModalFooter, Modal, ModalHeader, ModalBody } from "reactstrap";
class Staffs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      StaffSelected: null,
      modal: false,
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  onstaffSelect(staff) {
    this.toggle();
    this.setState({ StaffSelected: staff });
  }
  render() {
    const textStyle = {
      margin: "4px",
      color: "#993300",
    };
    const divStyle = {
      margin: "10px",
      backgroundColor: "#333",
      borderColor: "#333",
      textAlign: "center",
    };
    const staffList = this.props.staffs.map((staff) => {
      return (
        <div className="col-12 col-md-6 col-xl-4">
          <Card
            body
            inverse
            style={divStyle}
            key={staff.id}
            onClick={() => this.onstaffSelect(staff)}
          >
            <CardBody>
              <CardTitle>{staff.name}</CardTitle>
            </CardBody>
          </Card>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
            <ModalBody>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row" style={textStyle}>
          <h4> Nhấn Vào Tên Nhân Viên Để Xem Thông Tin</h4>
        </div>
        <div className="row">{staffList}</div>
      </div>
    );
  }
}
export default Staffs;
