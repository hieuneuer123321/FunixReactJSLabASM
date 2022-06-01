import React, { Component } from "react";
import { Card, CardTitle } from "reactstrap";

class Staffs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log(this.props.staffs);
    const staffList = this.props.staffs.map((staff) => {
      return (
        <div className="col-12 col-md-6 col-xl-4">
          <Card key={staff.id} onClick={() => this.onstaffSelect(staff)}>
            <CardTitle>{staff.name}</CardTitle>
          </Card>
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row">{staffList}</div>
      </div>
    );
  }
}
export default Staffs;
