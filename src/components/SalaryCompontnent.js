import React, { useState } from "react";
import { Card, CardTitle, CardText, CardBody } from "reactstrap";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// Hàm render các bẳng lương nhân viên dựa vào đối tượng đc truyền vào
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
  // Render
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
const sortListSalaryAsc = (listSalary) => {
  console.log(listSalary);
  // array.sort(function (a, b)).
  // Trong đó function (a, b) (không bắt buộc) là callback để bạn tùy chỉnh
  // thứ tự sắp xếp các phần tử trong mảng. Tham số a, b là một cặp phần tử trong mảng.
  // Callback trả về >= 0 thì a và b sẽ không đổi chỗ, trả về < 0 thì a và b
  // sẽ đổi chỗ cho nhau.
  // link : https://phambinh.net/bai-viet/lam-viec-voi-array-trong-javascript/#sort
  listSalary.sort((staff1, staff2) => {
    let s1 = staff1.salaryScale * 3000000 + staff1.overTime * 200000;

    let s2 = staff2.salaryScale * 3000000 + staff2.overTime * 200000;
    console.log(s1 - s2);
    return s1 - s2;
  });
};

const sortListSalaryDesc = (listSalary) => {
  console.log(listSalary);
  // array.sort(function (a, b)).
  // Trong đó function (a, b) (không bắt buộc) là callback để bạn tùy chỉnh
  // thứ tự sắp xếp các phần tử trong mảng. Tham số a, b là một cặp phần tử trong mảng.
  // Callback trả về >= 0 thì a và b sẽ không đổi chỗ, trả về < 0 thì a và b
  // sẽ đổi chỗ cho nhau.
  // link : https://phambinh.net/bai-viet/lam-viec-voi-array-trong-javascript/#sort
  listSalary.sort((staff1, staff2) => {
    let s1 = staff1.salaryScale * 3000000 + staff1.overTime * 200000;

    let s2 = staff2.salaryScale * 3000000 + staff2.overTime * 200000;
    console.log(s2 - s1);
    return s2 - s1;
  });
};

export default function SalaryCompontnent(props) {
  console.log(props.salary);
  let [dropdownOpen, setDropdownOpen] = useState(false); /// state của dropdown

  const toggle = () => {
    setDropdownOpen((dropdownOpen = !dropdownOpen)); // setState cho dropdown
  };

  return (
    <div className="container">
      <div className="row" style={{ margin: "10px 0px" }}>
        <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret>Sắp Xếp Theo Lương Nhân Viên</DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              onClick={() => {
                sortListSalaryAsc(props.salary);
              }}
            >
              Lương Tăng Dần{" "}
              <i class="fa fa-sort-numeric-asc" aria-hidden="true"></i>
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                sortListSalaryDesc(props.salary);
              }}
            >
              Lương Giảm Dần{" "}
              <i class="fa fa-sort-numeric-desc" aria-hidden="true"></i>
            </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </div>
      <div className="row">
        {/* truyền props  */}
        <RenderSalary salaryList={props.salary} />
      </div>
    </div>
  );
}
