import React, { Component } from "react";
import { Card, CardImgOverlay, CardImg, CardTitle } from "reactstrap";
import DishDetails from "./DishdetailComponent";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SelecteDishes: null,
    };
  }
  onDishSelect(dish) {
    this.setState({ selectedDish: dish });
  }
  // renderDishes(dish) {
  //   if (dish != null) {
  //     return (
  //       <Card>
  //         <CardImg top src={dish.image} alt={dish.name} />
  //         <CardBody>
  //           <CardTitle>{dish.name}</CardTitle>
  //           <CardText>{dish.description}</CardText>
  //         </CardBody>
  //       </Card>
  //     );
  //   } else return <div></div>;
  // }

  render() {
    console.log(this.props.dishes);
    const menu = this.props.dishes.map((dish) => {
      return (
        <div className="col-12 col-md-5 m-1">
          <Card key={dish.id} onClick={() => this.onDishSelect(dish)}>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardImgOverlay>
              <CardTitle>{dish.name}</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">{menu}</div>

        {/* {this.renderDishes(this.state.selectedDish)} */}
        <DishDetails dish={this.state.selectedDish} />

        {/* <div className="col-12 col-md-5 m-1">
            <DishDetails dish={this.state.selectedDish} />
          </div> */}
      </div>
    );
  }
}
export default Menu;
