import React from "react";
import { Card, CardTitle, CardText, CardBody } from "reactstrap";

export default function SalaryCompontnent(props) {
  console.log(props.salary);
  const styleCard = {
    margin: "20px 20px 20px 0px",
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6 col-xl-4">
          <Card style={styleCard}>
            <CardBody>
              <CardTitle>âsa</CardTitle>
              <CardText>Số Lượng Nhân Viên:</CardText>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
