import React, { Component } from "react";
import StaffsCom from "./components/StaffListComponent";
import { STAFFS } from "./shared/staffs";
import { Navbar, NavbarBrand } from "reactstrap";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffList: STAFFS,
    };
  }
  render() {
    return (
      <div className="App">
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ứng Dụng Quản Lý Nhân Sự v1.0</NavbarBrand>
          </div>
        </Navbar>
        <StaffsCom staffs={this.state.staffList} />
      </div>
    );
  }
}

export default App;
