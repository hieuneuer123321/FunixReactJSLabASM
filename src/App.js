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
      collumn: 3,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  setCollumn(number) {
    this.setState({ collumn: number });
  }
  render() {
    const textStyle = {
      color: "#FFFFFF",
      fontSize: "18px",
    };
    return (
      <div className="App">
        <div>
          <Navbar dark color="primary" light expand="md">
            <NavbarBrand style={textStyle}>
              Ứng Dụng Quản Lý Nhân Sự v1.0
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Số Cột Hiển Thị ( Đối Với desktop )
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem
                      onClick={() => {
                        this.setCollumn(2);
                      }}
                    >
                      2 Cột
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        this.setCollumn(3);
                      }}
                    >
                      3 Cột
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        this.setCollumn(6);
                      }}
                    >
                      6 Cột
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
        <StaffsCom staffs={this.state.staffList} collumn={this.state.collumn} />
      </div>
    );
  }
}

export default App;
