import React from "react";
import { Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";

function RenderStaff({ staff, onClick }) {
  return (
    <Card>
      <Link to={`/staff/${staff.id}`}>
        <CardImg width="100%" src={staff.image} alt={staff.name} />
        <CardImgOverlay>
          <CardTitle>{staff.name}</CardTitle>
        </CardImgOverlay>
      </Link>
    </Card>
  );
}

function Staffs(props) {
  const menu = props.staffs.map((staff) => {
    return (
      <div className="col-6 col-md-4 col-xl-2" key={staff.id}>
        <RenderStaff staff={staff} onClick={props.onClick} />
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h3>Nhân Viên</h3>
          <hr />
        </div>
      </div>
      <div className="row">{menu}</div>
    </div>
  );
}

export default Staffs;
