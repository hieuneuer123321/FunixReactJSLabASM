import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";
import dateFormat from "dateformat";

function RenderDish({ dish }) {
  return (
    <div className="col-12 col-md-5 m-1">
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({ comments }) {
  if (comments.length > 0) {
    const loadComment = comments.map((disher) => {
      return (
        <div key={disher.id}>
          <CardText>{disher.comment}</CardText>
          <CardText>
            - - {disher.author},{dateFormat(disher.date, " mmmm dS, yyyy")}
          </CardText>
          <br />
        </div>
      );
    });
    return (
      <div className="col-12 col-md-5 m-1">
        <CardBody>
          <h4>Comments</h4>
          {loadComment}
        </CardBody>
      </div>
    );
  } else {
    return <div></div>;
  }
}

const DishDetail = (props) => {
  console.log(props);
  if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <RenderDish dish={props.dish} />

          <RenderComments comments={props.dish.comments} />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default DishDetail;
