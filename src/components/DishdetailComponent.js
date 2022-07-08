import React, { useState, Component } from "react";
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
  Modal,
  Row,
  Col,
  Label,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { Link } from "react-router-dom";
import { baseUrl } from "../shared/baseUrl";
import LoadingComponent from "./LoadingComponent";
// import CommentForm from "./CommentForm";
import { Control, LocalForm, Errors } from "react-redux-form";
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
/////////////////////////////////
function RenderDish({ dish }) {
  return (
    <Card>
      <CardImg top src={baseUrl + dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  );
}

function RenderComments({ comments, modal, setModal, postComment, dishId }) {
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
        <CommentForm
          modal={modal}
          toggle={setModal((modal = !modal))}
          postComment={postComment}
          dishId={dishId}
        />
      </CardBody>
    );
  } else {
    return <div></div>;
  }
}
class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(value) {
    this.props.toggle();
    // console.log("Comment is: " + JSON.stringify(value));
    // alert("Comment is: " + JSON.stringify(value));
    this.props.postComment(
      this.props.dishId,
      value.rating ? value.rating : "1",
      value.author,
      value.comment
    );
    console.log(this.props.postComment);
  }
  render() {
    return (
      <Modal
        isOpen={this.props.modal}
        toggle={this.props.toggle}
        className={this.props.className}
      >
        <ModalHeader toggle={this.props.toggle}>Submitt Comment</ModalHeader>
        <ModalBody>
          <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
            <Row className="form-group">
              <Col>
                <Label htmlFor="rating">Rate</Label>
              </Col>
            </Row>
            <Row className="form-group">
              <Col>
                <Control.select
                  model=".rating"
                  id="rating"
                  name="rating"
                  className="form-control"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </Col>
            </Row>
            <Row className="form-group">
              <Col>
                <Label htmlFor="author">Your Name</Label>
              </Col>
            </Row>
            <Row className="form-group">
              <Col>
                <Control.text
                  model=".author"
                  id="author"
                  name="author"
                  placeholder="Your Name"
                  className="form-control"
                  validators={{
                    minLength: minLength(3),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  messages={{
                    minLength: "Must be greater than 2 characters",
                    maxLength: "Must be 15 characters or less",
                  }}
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Col>
                <Label htmlFor="comment">Comment</Label>
              </Col>
            </Row>
            <Row className="form-group">
              <Col>
                <Control.textarea
                  model=".comment"
                  id="comment"
                  name="comment"
                  rows="6"
                  className="form-control"
                />
              </Col>
            </Row>
            <Row className="form-group">
              <Col>
                <Button type="submit" color="primary">
                  Summit
                </Button>
              </Col>
            </Row>
          </LocalForm>
        </ModalBody>
      </Modal>
    );
  }
}

const DishDetail = (props) => {
  let [modal, setModal] = useState(true);
  const toggle = () => {
    setModal((modal = !modal)); // setState cho modal
  };
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <LoadingComponent />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null) {
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
              postComment={props.postComment}
              dishId={props.dish.id}
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
