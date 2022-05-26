import React, { Component } from 'react';
import "./App.css";
class App extends Component {

  render() {
    return (
      <div className="App">
        <p>Chà Mừng Bạn Đã Đến Với ReactJS</p>
        <p>Phiên bản React hiện tại trên máy của bạn là: {React.version}</p>
        <p>Phiên bản React đã được sử dụng để thiết kế môn học: 16.14.0.</p>
        <p>Update</p>
      </div>
    );
  }
}

export default App;