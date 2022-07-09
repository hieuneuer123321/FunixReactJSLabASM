import React, { Component } from "react";
import StaffsComponent from "./StaffListComponent";
import StaffDetail from "./StaffDetailComponent";
// import { STAFFS, DEPARTMENTS } from "../shared/staffs";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import DepartmentComponent from "./DepartmentComponent";
import SalaryCompontnent from "./SalaryCompontnent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchStaffs,
  fetchDepartments,
  fetchSalary,
} from "../redux/ActionCreators";

const mapStateToProps = (state) => ({
  staffs: state.staffs,
  departments: state.departments,
  salary: state.salary,
});
const mapDispatchToProps = (dispatch) => ({
  fetchStaffs: () => dispatch(fetchStaffs()),
  fetchDepartments: () => dispatch(fetchDepartments()),
  fetchSalary: () => dispatch(fetchSalary()),
});
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // staffs: JSON.parse(localStorage.getItem("StaffList"))
      //   ? JSON.parse(localStorage.getItem("StaffList"))
      //   : STAFFS,
      // department: DEPARTMENTS,
    };
    this.addStaff = this.addStaff.bind(this);
  }
  addStaff(staff) {
    console.log(staff);
    // this.setState({ staffs: [staff, ...this.props.staffs] });
  }
  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepartments();
    this.props.fetchSalary();
  }
  render() {
    const RenderStaffDetails = ({ match }) => {
      return (
        <StaffDetail
          staff={
            this.props.staffs.staffs.filter(
              (staff) => staff.id === parseInt(match.params.id, 10)
            )[0]
          }
          isLoading={this.props.staffs.isLoading}
          errorMessage={this.props.staffs.errorMessage}
        />
      );
    };
    return (
      <div>
        <Header />
        <Switch>
          <Route
            path="/staffs"
            component={() => (
              <StaffsComponent
                addStaff={this.addStaff}
                staffs={this.props.staffs.staffs}
                isLoading={this.props.staffs.isLoading}
                errorMessage={this.props.staffs.errorMessage}
              />
            )}
          />
          <Route path="/staff/:id" component={RenderStaffDetails} />
          <Route
            path="/departments"
            component={() => (
              <DepartmentComponent
                department={this.props.departments.departments}
                isLoading={this.props.departments.isLoading}
                errorMessage={this.props.departments.errorMessage}
              />
            )}
          />
          <Route
            path="/Salary"
            component={() => (
              <SalaryCompontnent
                salary={this.props.salary.salary}
                isLoading={this.props.salary.isLoading}
                errorMessage={this.props.salary.errorMessage}
              />
            )}
          />
          <Redirect to="/staffs" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
