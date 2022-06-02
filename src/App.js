import React, { Component } from "react";
import StaffsCom from "./components/StaffListComponent";
import { STAFFS } from "./shared/staffs";
// import { Navbar, NavbarBrand } from "reactstrap";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      staffList: STAFFS,
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    return (
      <div className="App">
        {/* <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ứng Dụng Quản Lý Nhân Sự v1.0</NavbarBrand>
          </div>
        </Navbar> */}
        <div>
          <Navbar dark color="primary" light expand="md">
            <NavbarBrand href="/">Ứng Dụng Quản Lý Nhân Sự v1.0</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Số Cột Hiển Thị ( Đối Với decktop )
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>2 Cột</DropdownItem>
                    <DropdownItem>3 Cột</DropdownItem>
                    <DropdownItem>4 Cột</DropdownItem>
                    <DropdownItem>5 Cột</DropdownItem>
                    <DropdownItem>6 Cột</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
        <StaffsCom staffs={this.state.staffList} />
      </div>
    );
  }
}

export default App;
