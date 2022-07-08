import React from "react";
import LoadingComponent from "./LoadingComponent";
import { FadeTransform } from "react-animation-components";

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { baseUrl } from "../shared/baseUrl";

function RenderCard({ item, isLoading, errorMessage }) {
  if (isLoading) {
    return <LoadingComponent />;
  } else if (errorMessage) {
    return <h4>{errorMessage}</h4>;
  } else {
    return (
      <FadeTransform
        in
        transformProps={{ exitTransform: "scale(0.5) translateY(-50%) " }}
      >
        <Card>
          <CardImg
            src={
              (baseUrl + item.image).includes("assets")
                ? item.image
                : baseUrl + item.image
            }
            alt={item.name}
          />
          <CardBody>
            <CardTitle>{item.name}</CardTitle>
            {item.designation ? (
              <CardSubtitle>{item.designation}</CardSubtitle>
            ) : null}
            <CardText>{item.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    );
  }
}

function Home(props) {
  return (
    <div className="container">
      <div className="row align-items-start">
        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.dish}
            isLoading={props.dishesLoading}
            errorMessage={props.dishesErrMess}
          />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.promotion}
            isLoading={props.promosLoading}
            errorMessage={props.promosErrMess}
          />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.leader}
            isLoading={props.leadersLoading}
            errorMessage={props.leadersErrMess}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
