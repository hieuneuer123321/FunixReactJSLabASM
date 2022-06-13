import React from "react";
import { Card, CardTitle, CardText, CardBody } from "reactstrap";

const RenderSalary = ({ salaryList }) => {
  const styleCard = {
    margin: "20px 20px 20px 0px",
  };
  return salaryList.map((salary) => (
    <div className="col-12 col-md-6 col-xl-4">
      <Card style={styleCard}>
        <CardBody>
          <CardTitle>{salary.name}</CardTitle>
          <CardText>Mã Nhân Viên: {salary.id}</CardText>
          <CardText>Hệ Số Lương: {salary.salaryScale}</CardText>
          <CardText>Số Ngày Làm Thêm: {salary.overTime}</CardText>
        </CardBody>
      </Card>
    </div>
  ));
};

export default function SalaryCompontnent(props) {
  console.log(props.salary);

  return (
    <div className="container">
      <div className="row">
        <RenderSalary salaryList={props.salary} />
      </div>
    </div>
  );
}
