import React, { Component } from "react";
import { Card, CardImg, CardText, CardTitle, CardBody } from "reactstrap";
import dateFormat from "dateformat";

class Dishdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.dish != null) {
      const loadComment = this.props.dish.comments.map((disher) => {
        if (this.props.dish.comments != null) {
          return (
            <div key={disher.id}>
              <CardText>{disher.comment}</CardText>
              <CardText>
                - - {disher.author},{dateFormat(disher.date, " mmmm dS, yyyy")}
              </CardText>
              <br />
            </div>
          );
        } else return <div></div>;
      });
      return (
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-5 m-1">
              <Card>
                <CardImg
                  top
                  src={this.props.dish.image}
                  alt={this.props.dish.name}
                />
                <CardBody>
                  <CardTitle>{this.props.dish.name}</CardTitle>
                  <CardText>{this.props.dish.description}</CardText>
                </CardBody>
              </Card>
            </div>
            <div className="col-12 col-md-5 m-1">
              <CardBody>
                <h4>Comments</h4>
                {loadComment}
              </CardBody>
            </div>
          </div>
        </div>
      );
    } else return <div></div>;
  }
}
export default Dishdetail;
