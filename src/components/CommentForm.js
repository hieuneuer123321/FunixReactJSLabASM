import React, { Component } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Label,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";

const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
export default class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleSubmit(value) {
    console.log("Comment is: " + JSON.stringify(value));
    alert("Comment is: " + JSON.stringify(value));
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
                <Label htmlFor="rate">Rate</Label>
              </Col>
            </Row>
            <Row className="form-group">
              <Col>
                <Control.select
                  model=".rate"
                  id="rate"
                  name="rate"
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
                <Label htmlFor="yourname">Your Name</Label>
              </Col>
            </Row>
            <Row className="form-group">
              <Col>
                <Control.text
                  model=".yourname"
                  id="yourname"
                  name="yourname"
                  placeholder="Your Name"
                  className="form-control"
                  validators={{
                    minLength: minLength(3),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".yourname"
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
