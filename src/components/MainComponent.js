import React, { Component } from "react";
import StaffsComponent from "./StaffListComponent";
import StaffDetail from "./StaffDetailComponent";
// import { STAFFS, DEPARTMENTS } from "../shared/staffs";
import StaffOfDepartmentComponent from "./StaffOfDepartmentComponent";
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
  fetchStaffsOfDepartment,
  postAddStaff,
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
  fetchStaffsOfDepartment: (departmentId) =>
    dispatch(fetchStaffsOfDepartment(departmentId)),
  postAddStaff: (
    name,
    doB,
    salaryScale,
    departmentId,
    startDate,
    annualLeave,
    overTime
  ) =>
    dispatch(
      postAddStaff(
        name,
        doB,
        salaryScale,
        departmentId,
        startDate,
        annualLeave,
        overTime
      )
    ),
});
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.addStaff = this.addStaff.bind(this);
  }
  // addStaff(staff) {
  //   console.log(staff);
  // }
  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepartments();
    this.props.fetchSalary();
  }
  render() {
    const RenderStaffOfDepartment = ({ match }) => {
      return (
        <StaffOfDepartmentComponent
          departmentsId={match.params.id}
          departmentsName={
            this.props.departments.departments.filter(
              (department) => department.id === match.params.id
            )[0]
          }
          // staffOfDepartment={this.props.fetchStaffsOfDepartment}
        />
      );
    };
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
          departments={this.props.departments.departments}
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
                postAddStaff={this.props.postAddStaff}
                staffs={this.props.staffs.staffs}
                isLoading={this.props.staffs.isLoading}
                errorMessage={this.props.staffs.errorMessage}
              />
            )}
          />
          <Route path="/staff/:id" component={RenderStaffDetails} />
          <Route path="/departments/:id" component={RenderStaffOfDepartment} />
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
