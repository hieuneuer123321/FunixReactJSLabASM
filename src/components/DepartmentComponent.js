import React from "react";
import { Card, CardTitle, CardText, CardBody } from "reactstrap";
import LoadingComponent from "./LoadingComponent";

function RenderDepartment({ departmentList }) {
  const styleCard = {
    margin: "20px 20px 20px 0px",
  };

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
  if (props.isLoading) {
    return <LoadingComponent />;
  } else if (props.errorMessage) {
    return <h4>{props.errorMessage}</h4>;
  } else {
    return (
      <div className="container">
        <div className="row">
          <RenderDepartment departmentList={props.department} />
        </div>
      </div>
    );
  }
}
