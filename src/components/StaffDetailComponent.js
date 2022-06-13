import React from "react";
// import { Button, ModalFooter, Modal, ModalHeader, ModalBody } from "reactstrap";
import dateFormat from "dateformat";
import { Breadcrumb, BreadcrumbItem, Media } from "reactstrap";
import { Link } from "react-router-dom";
function StaffDetail(props) {
  console.log(props);
  const styleCardImg = {
    margin: "0px 20px 10px 0px",
  };
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/staffs">Nhân Viên</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="row">
        <div className="col-12 col-md-6 col-xl-6">
          <Media>
            <Media left>
              <Media
                object
                src={props.staff.image}
                alt="image"
                height="220px"
                style={styleCardImg}
              />
            </Media>
            <Media body>
              <Media heading>{props.staff.name}</Media>
              <p> Ngày Sinh: {dateFormat(props.staff.doB, "dd/mm/yyyy")}</p>
              <p>
                Ngày Vào Công Ty:{" "}
                {dateFormat(props.staff.startDate, "dd/mm/yyyy")}
              </p>
              <p> Phòng Ban: {props.staff.department.name}</p>
              <p> Số Ngày Nghỉ Còn Lại: {props.staff.annualLeave}</p>
              <p> Số Ngày Đã Làm Thêm: {props.staff.overTime}</p>
            </Media>
          </Media>
        </div>
      </div>
    </div>
  );
  // const divStyle = {
  //   color: "#00CCFF",
  // };

  // if (this.props.StaffDetail != null) {
  //   return (
  //     <Modal
  //       isOpen={this.props.isOpen}
  //       toggle={this.props.toggle}
  //       className={this.props.classN}
  //     >
  //       <ModalHeader toggle={this.props.toggle} style={divStyle}>
  //         Họ Và Tên: {this.props.StaffDetail.name}
  //       </ModalHeader>
  //       <ModalBody>
  //         Ngày Sinh: {dateFormat(this.props.StaffDetail.doB, "dd/mm/yyyy")}
  //         <br />
  //         Ngày Vào Công Ty :
  //         {dateFormat(this.props.StaffDetail.startDate, "dd/mm/yyyy")}
  //         <br />
  //         Phòng Ban: {this.props.StaffDetail.department.name}
  //         <br />
  //         Số Ngày Nghỉ Còn Lại: {this.props.StaffDetail.annualLeave}
  //         <br />
  //         Số Ngày Đã Làm Thêm: {this.props.StaffDetail.overTime}
  //         <br />
  //       </ModalBody>
  //       <ModalFooter>
  //         <Button color="secondary" onClick={this.props.toggle}>
  //           Cancel
  //         </Button>
  //       </ModalFooter>
  //     </Modal>
  //   );
  // } else {
  //   return <div></div>;
  // }
}
export default StaffDetail;
