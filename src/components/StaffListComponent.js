import React, { Component } from "react";
import { Card, CardTitle, CardBody } from "reactstrap";
import StaffDetail from "./StaffDetailComponent";

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
    let classColumn = `col-12 col-md-6 col-xl-${12 / this.props.collumn}`;
    const textStyle = {
      color: "#993300",
      margin: "2px",
    };
    const divStyle = {
      margin: "10px 0px 10px 0px",
      backgroundColor: "#9f6060",
      borderColor: "#333",
      textAlign: "center",
    };

    const staffList = this.props.staffs.map((staff) => {
      return (
        <div className={classColumn}>
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
          <StaffDetail
            StaffDetail={this.state.StaffSelected}
            isOpen={this.state.modal}
            toggle={this.toggle}
            classN={this.props.className}
          />
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row" style={textStyle}>
          <h5> Nhấn Vào Tên Nhân Viên Để Xem Thông Tin</h5>
        </div>
        <div className="row">{staffList}</div>
      </div>
    );
  }
}
export default Staffs;
