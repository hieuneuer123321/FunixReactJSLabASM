import React, { Component } from "react";
import StaffsComponent from "./StaffListComponent";
import StaffDetail from "./StaffDetailComponent";
import { STAFFS, DEPARTMENTS } from "../shared/staffs";
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
      department: DEPARTMENTS,
    };
  }

  render() {
    const RenderStaffDetails = ({ match }) => {
      return (
        <StaffDetail
          staff={
            this.state.staffs.filter(
              (staff) => staff.id === parseInt(match.params.id, 10)
            )[0]
          }
        />
      );
    };
    return (
      <div>
        <Header />
        <Switch>
          <Route
            path="/staffs"
            component={() => <StaffsComponent staffs={this.state.staffs} />}
          />
          <Route path="/staff/:id" component={RenderStaffDetails} />
          <Route path="/demo/:ab" component={StaffDetail} />
          <Route
            path="/departments"
            component={() => (
              <DepartmentComponent department={this.state.department} />
            )}
          />
          <Route path="/Salary" component={SalaryCompontnent} />
          <Redirect to="/staffs" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
