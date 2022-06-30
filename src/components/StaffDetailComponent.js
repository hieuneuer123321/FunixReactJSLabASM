import React from "react";
import dateFormat from "dateformat";
import { Breadcrumb, BreadcrumbItem, Media } from "reactstrap";
import { Link } from "react-router-dom";
function StaffDetail(props) {
  console.log(props);
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
        <Media className="col-12 col-md-4 col-xl-3">
          <Media
            object
            src={props.staff.image}
            alt="image"
            height="220px"
            width="100%"
          />
        </Media>
        <Media body className="col-12 col-md-8 col-xl-9">
          <Media heading>{props.staff.name}</Media>
          <p> Ngày Sinh: {dateFormat(props.staff.doB, "dd/mm/yyyy")}</p>
          <p>
            Ngày Vào Công Ty: {dateFormat(props.staff.startDate, "dd/mm/yyyy")}
          </p>
          <p>
            {" "}
            Phòng Ban:{" "}
            {props.staff.department.name
              ? props.staff.department.name
              : props.staff.department}
          </p>
          <p> Số Ngày Nghỉ Còn Lại: {props.staff.annualLeave}</p>
          <p> Số Ngày Đã Làm Thêm: {props.staff.overTime}</p>
        </Media>
      </div>
    </div>
  );
}
export default StaffDetail;
