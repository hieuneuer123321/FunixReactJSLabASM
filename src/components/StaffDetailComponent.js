import React, { Component } from "react";
import { Button, ModalFooter, Modal, ModalHeader, ModalBody } from "reactstrap";
import dateFormat from "dateformat";

class StaffDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      StaffSelected: null,
    };
  }
  render() {
    const divStyle = {
      color: "#00CCFF",
    };

    if (this.props.StaffDetail != null) {
      return (
        <Modal
          isOpen={this.props.isOpen}
          toggle={this.props.toggle}
          className={this.props.classN}
        >
          <ModalHeader toggle={this.props.toggle} style={divStyle}>
            Họ Và Tên: {this.props.StaffDetail.name}
          </ModalHeader>
          <ModalBody>
            Ngày Sinh: {dateFormat(this.props.StaffDetail.doB, "dd/mm/yyyy")}
            <br />
            Ngày Vào Công Ty :
            {dateFormat(this.props.StaffDetail.startDate, "dd/mm/yyyy")}
            <br />
            Phòng Ban: {this.props.StaffDetail.department.name}
            <br />
            Số Ngày Nghỉ Còn Lại: {this.props.StaffDetail.annualLeave}
            <br />
            Số Ngày Đã Làm Thêm: {this.props.StaffDetail.overTime}
            <br />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.props.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      );
    } else {
      return <div></div>;
    }
  }
}
export default StaffDetail;
