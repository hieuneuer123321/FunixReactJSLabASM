import React from "react";
import dateFormat from "dateformat";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

function RenderDish({ dish }) {
  return (
    <Card>
      <CardImg top src={dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
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
      <CardBody>
        <h4>Comments</h4>
        {loadComment}
      </CardBody>
    );
  } else {
    return <div></div>;
  }
}

const DishDetail = (props) => {
  if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.dish.comments} />
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default DishDetail;
