import React from "react";
import { Card, CardTitle, CardText, CardBody } from "reactstrap";

export default function DepartmentComponent(props) {
  const styleCard = {
    margin: "20px 20px 20px 0px",
  };
  console.log(props);
  return (
    <div className="container">
      <div className="row">
        <Card style={styleCard}>
          <CardBody>
            <CardTitle>Card title</CardTitle>
            <CardText>
              Some quick example text to build on the card title and make up the
            </CardText>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
