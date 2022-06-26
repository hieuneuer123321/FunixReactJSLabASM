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

function AddStaff() {
  alert("ass");
}

function Staffs(props) {
  let [nameFind, setNameFind] = useState("");
  console.log(nameFind);
  const search = (event) => {
    event.preventDefault();
    const name = event.target.nameStaff.value;
    setNameFind((nameFind = name));
  };
  const staffList = props.staffs
    .filter((staff) => {
      if (nameFind === "") return staff;
      else if (staff.name.toLowerCase().includes(nameFind.toLowerCase()))
        return staff;
      return 0;
    })
    .map((staff) => {
      return (
        <div className="col-6 col-md-4 col-xl-2" key={staff.id}>
          <RenderStaff staff={staff} onClick={props.onClick} />
        </div>
      );
    });

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6 mt-3">
          <div className="row">
            <div className="col-10 col-md-10 ">
              <h3>Nhân Viên</h3>
            </div>
            <div className="col-2 col-auto ">
              <button
                className="btn btn-primary"
                outline
                onClick={() => {
                  AddStaff();
                }}
              >
                <span className="fa fa-plus fa-lg" aria-hidden="true"></span>
              </button>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 mt-3">
          <form onSubmit={search} className="form-group row">
            <div className="col-8 col-md-8">
              <input
                type="text"
                className="form-control"
                placeholder="Tìm Kiếm Nhân Viên ..."
                name="nameStaff"
              />
            </div>
            <div className="col-4 col-md-4">
              <button type="submit" className="btn btn-success">
                Tìm Kiếm
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="row">{staffList}</div>
    </div>
  );
}

export default Staffs;
