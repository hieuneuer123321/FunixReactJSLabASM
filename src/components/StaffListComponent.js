import React, { useState } from "react";
import { Card, CardImg } from "reactstrap";
import { Link } from "react-router-dom";

// Hàm render các nhân viên từ danh sách
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
  // staffList là giá trị trả về khi tìm kiếm
  let [staffList, setStaff] = useState(); // State  sử dụng Hook trong function component
  const Search = (staffsList) => {
    const searchText = document.querySelector("#search").value;
    if (searchText === "") {
      setStaff(
        (staffList = (
          <div>
            <h3>Bạn chưa nhập tên nhân viên muốn tìm vào thanh tìm kiếm</h3>
          </div>
        )) // Set State
      );
    } else {
      // Lọc danh sách dựa vào tên đc người dùng nhập
      const searchStaffList = staffsList.filter((staff) => {
        // toLowerCase() chuyển chuỗi thành chữ thường,
        // .includes(searchText) kiếm tra 1 ký tự có chứ trong chuỗi hay k trả về true or false
        return (
          staff.name.toLowerCase().includes(searchText.toLowerCase()) === true
        );
      });
      // Nếu tìm k thấy tên nhân viên nào thỏa điều kiện
      if (searchStaffList.length === 0) {
        setStaff(
          (staffList = (
            <div>
              <h3>Nhân Viên {searchText} Không Có Trong Danh Sách</h3>
            </div>
          ))
        );
      } else {
        // Nếu có nhân viên thỏa đk lọc thì Render ra
        const RenderSearchStaff = searchStaffList.map((staff) => {
          return (
            <div className="col-6 col-md-4 col-xl-2" key={staff.id}>
              <RenderStaff staff={staff} onClick={props.onClick} />
            </div>
          );
        });
        setStaff((staffList = RenderSearchStaff));
      }
    }
    document.querySelector("#search").value = "";
    return staffList;
  };
  // Render tất cả nhân viên
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
