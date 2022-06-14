import React, { useState } from "react";
import { Card, CardImg } from "reactstrap";
import { Link } from "react-router-dom";

function RenderStaff({ staff, onClick }) {
  const styleTextCard = {
    textAlign: "center",
    color: "black",
  };
  const styleCard = {
    marginBottom: "10px",
  };
  return (
    <Card style={styleCard}>
      <Link to={`/staff/${staff.id}`}>
        <CardImg width="100%" src={staff.image} alt={staff.name} />
        <h6 style={styleTextCard}>{staff.name}</h6>
      </Link>
    </Card>
  );
}

function Staffs(props) {
  let [staffList, setStaff] = useState();

  const Search = (staffsList) => {
    const searchText = document.querySelector("#search").value;
    console.log(searchText);
    console.log(staffsList);
    if (searchText === "") {
      alert("Bạn chưa nhập tên nhân viên muốn tìm");
      setStaff((staffList = <div></div>));
    } else {
      const searchStaffList = staffsList.filter((staff) => {
        // toLowerCase() chuyển chuỗi thành chữ thường,
        // .includes(searchText) kiếm tra 1 ký tự có chứ trong chuỗi hay k trả về true or false
        return (
          staff.name.toLowerCase().includes(searchText.toLowerCase()) === true
        );
      });
      console.log(searchStaffList);
      if (searchStaffList.length === 0) {
        setStaff((staffList = <div></div>));
        alert("Tên Nhân Viên Bạn Nhập K Có Trong Danh Sách");
      } else {
        const RenderSearchStaff = searchStaffList.map((staff) => {
          return (
            <div className="col-6 col-md-4 col-xl-2" key={staff.id}>
              <RenderStaff staff={staff} onClick={props.onClick} />
            </div>
          );
        });
        setStaff((staffList = RenderSearchStaff));
        console.log(RenderSearchStaff);
      }
    }
    document.querySelector("#search").value = "";
    return staffList;
  };

  const menu = props.staffs.map((staff) => {
    return (
      <div className="col-6 col-md-4 col-xl-2" key={staff.id}>
        <RenderStaff staff={staff} onClick={props.onClick} />
      </div>
    );
  });
  console.log(staffList);
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h3>Nhân Viên</h3>
          <div class="box">
            <div class="container-4">
              <input type="search" id="search" placeholder="Search..." />
              <button class="icon" onClick={() => Search(props.staffs)}>
                <i class="fa fa-search"></i>
              </button>
            </div>
          </div>
          <hr />
        </div>
      </div>
      <div className="row">{staffList ? staffList : menu}</div>
    </div>
  );
}

export default Staffs;
