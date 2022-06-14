import React, { useState } from "react";
import { Card, CardTitle, CardText, CardBody } from "reactstrap";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const RenderSalary = ({ salaryList }) => {
  const styleCard = {
    margin: "20px 20px 20px 0px",
    fontWeight: "500",
    fontSize: "18px",
  };
  const styleCardTitle = {
    fontSize: "35px",
  };
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "VND", // Ki hiệu trước số tiền
    minimumFractionDigits: 0, // số sau dấu . cuối cùng vd 2,200.00
  });
  return salaryList.map((salary) => (
    <div className="col-12 col-md-6 col-xl-4">
      <Card style={styleCard}>
        <CardBody>
          <CardTitle style={styleCardTitle}>{salary.name}</CardTitle>
          <CardText>Mã Nhân Viên: {salary.id}</CardText>
          <CardText>Hệ Số Lương: {salary.salaryScale}</CardText>
          <CardText>Số Ngày Làm Thêm: {salary.overTime}</CardText>
          <CardText>
            Lương:{" "}
            {formatter.format(
              salary.salaryScale * 3000000 + salary.overTime * 200000
            )}{" "}
            VNĐ
          </CardText>
        </CardBody>
      </Card>
    </div>
  ));
};

export default function SalaryCompontnent(props) {
  console.log(props.salary);
  let [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => {
    setDropdownOpen((dropdownOpen = !dropdownOpen));
  };
  return (
    <div className="container">
      <div className="row" style={{ margin: "10px 0px" }}>
        <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret>Sắp Xếp Theo Lương Nhân Viên</DropdownToggle>
          <DropdownMenu>
            <DropdownItem>
              Lương Tăng Dần{" "}
              <i class="fa fa-sort-numeric-asc" aria-hidden="true"></i>
            </DropdownItem>
            <DropdownItem>
              Lương Giảm Dần{" "}
              <i class="fa fa-sort-numeric-desc" aria-hidden="true"></i>
            </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </div>
      <div className="row">
        <RenderSalary salaryList={props.salary} />
      </div>
    </div>
  );
}
