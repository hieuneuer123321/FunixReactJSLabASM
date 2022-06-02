import React, { Component } from "react";
import { Card, CardTitle, CardBody, CardText } from "reactstrap";
import dateFormat from "dateformat";

class StaffDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      StaffSelected: null,
    };
  }
  render() {
    console.log(this.props.StaffDetail);
    if (this.props.StaffDetail != null) {
      return (
        <div className="col-12 col-md-6 col-xl-4">
          <Card>
            <CardBody>
              <CardTitle>Họ Và Tên: {this.props.StaffDetail.name}</CardTitle>
              <CardText>
                Ngày Sinh:
                {dateFormat(this.props.StaffDetail.doB, "dd/mm/yyyy")}
              </CardText>
              <CardText>
                Ngày Vào Công Ty:
                {dateFormat(this.props.StaffDetail.startDate, "dd/mm/yyyy")}
              </CardText>
              <CardText>
                Phòng Ban: {this.props.StaffDetail.department.name}
              </CardText>
              <CardText>
                Số Ngày Nghỉ Còn Lại: {this.props.StaffDetail.annualLeave}
              </CardText>
              <CardText>
                Số Ngày Đã Làm Thêm: {this.props.StaffDetail.overTime}
              </CardText>
            </CardBody>
          </Card>
        </div>
      );
    } else {
      return (
        <div className="col-12 col-md-6 col-xl-4">
          Bấm Vào Tên Nhân Viên Để Xem Thông Tin
        </div>
      );
    }
  }
}
export default StaffDetail;
