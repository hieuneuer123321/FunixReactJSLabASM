import React, { Component } from "react";
import StaffsCom from "./components/StaffListComponent";
import StaffList from "./shared/staffs";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffList: StaffList,
    };
  }
  render() {
    return (
      <div className="App">
        <StaffsCom staffs={this.state.staffList} />
      </div>
    );
  }
}

export default App;
