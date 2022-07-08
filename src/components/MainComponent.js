import React, { Component } from "react";
import Menu from "./MenuComponent";
import DishDetail from "./DishdetailComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchDishes,
  fetchPromos,
  fetchComments,
  postComment,
} from "../redux/ActionCreators";
import { actions } from "react-redux-form";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchComments: () => dispatch(fetchComments()),
  resetFeedbackForm: () => {
    dispatch(actions.reset("feedback"));
  },
  postComment: (dishId, rating, author, comment) => {
    dispatch(postComment(dishId, rating, author, comment));
  },
});
class Main extends Component {
  // onDishSelect(dishId) {
  //   this.setState({ selectedDish: dishId });
  // }
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchPromos();
    this.props.fetchComments();
  }
  render() {
    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={
            this.props.dishes.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errorMessage}
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10)
          )}
          CommentsErrMess={this.props.comments.errorMessage}
          postComment={this.props.postComment}
        />
      );
    };
    const HomePage = () => {
      console.log(this.props.dishes.dishes);
      return (
        <Home
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errorMessage}
          promotion={
            this.props.promotions.promos.filter((promo) => promo.featured)[0]
          }
          promosLoading={this.props.promotions.isLoading}
          promosErrMess={this.props.promotions.errorMessage}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    };
    return (
      <div>
        <Header />
        {/* <Menu
          dishes={this.state.dishes}
          onClick={(dishId) => this.onDishSelect(dishId)}
        /> */}
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route
            exact
            path="/contactus"
            component={() => (
              <Contact resetFeedbackForm={this.props.resetFeedbackForm} />
            )}
          />
          <Route
            exact
            path="/menu"
            component={() => <Menu dishes={this.props.dishes} />}
          />
          <Redirect to="/home" />
        </Switch>
        <DishDetail
          dish={
            this.props.dishes.dishes.filter(
              (dish) => dish.id === this.props.selectedDish
            )[0]
          }
        />
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
