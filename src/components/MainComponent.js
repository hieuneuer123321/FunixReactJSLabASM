import React, { Component } from "react";
import StaffsComponent from "./StaffListComponent";
import { STAFFS } from "../shared/staffs";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import DepartmentComponent from "./DepartmentComponent";
import SalaryCompontnent from "./SalaryCompontnent";
import { Switch, Route, Redirect } from "react-router-dom";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staffs: STAFFS,
    };
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route
            path="/staffs"
            component={() => <StaffsComponent staffs={this.state.staffs} />}
          />
          <Route path="/departments" component={DepartmentComponent} />
          <Route path="/Salary" component={SalaryCompontnent} />
          <Redirect to="/staffs" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
