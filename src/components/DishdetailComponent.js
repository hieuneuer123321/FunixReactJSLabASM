import React, { useState } from "react";
import dateFormat from "dateformat";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";

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

function RenderComments({ comments, modal, setModal }) {
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
        <Button color="secondary" onClick={setModal((modal = !modal))}>
          <i class="fa fa-pencil" aria-hidden="true"></i> Summit Comment
        </Button>
        <CommentForm modal={modal} toggle={setModal((modal = !modal))} />
      </CardBody>
    );
  } else {
    return <div></div>;
  }
}

const DishDetail = (props) => {
  let [modal, setModal] = useState(true);
  const toggle = () => {
    setModal((modal = !modal)); // setState cho modal
  };
  console.log(props.dish);

  if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
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
            <RenderComments
              comments={props.comments}
              modal={modal}
              setModal={() => toggle}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default DishDetail;
