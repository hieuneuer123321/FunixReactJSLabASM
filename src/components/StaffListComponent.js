import React, { Component } from "react";
import { Card, CardTitle, CardBody } from "reactstrap";
import StaffDetail from "./StaffDetailComponent";

class Staffs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      StaffSelected: null,
    };
  }
  onstaffSelect(staff) {
    this.setState({ StaffSelected: staff });
  }
  render() {
    console.log(this.props.staffs);
    const staffList = this.props.staffs.map((staff) => {
      return (
        <div className="col-12 col-md-6 col-xl-4">
          <Card key={staff.id} onClick={() => this.onstaffSelect(staff)}>
            <CardBody>
              <CardTitle>{staff.name}</CardTitle>
            </CardBody>
          </Card>
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row">{staffList}</div>
        <div className="row">
          <StaffDetail StaffDetail={this.state.StaffSelected} />
        </div>
      </div>
    );
  }
}
export default Staffs;
