import React from "react";
import { Card, CardTitle, CardText, CardBody } from "reactstrap";

function RenderDepartment({ departmentList }) {
  const styleCard = {
    margin: "20px 20px 20px 0px",
  };

  console.log(departmentList[2]);
  return departmentList.map((department) => (
    <div className="col-12 col-md-6 col-xl-4">
      <Card style={styleCard}>
        <CardBody>
          <CardTitle>{department.name}</CardTitle>
          <CardText>Số Lượng Nhân Viên: {department.numberOfStaff}</CardText>
        </CardBody>
      </Card>
    </div>
  ));
}

export default function DepartmentComponent(props) {
  console.log(props);

  return (
    <div className="container">
      <div className="row">
        <RenderDepartment departmentList={props.department} />
      </div>
    </div>
  );
}
