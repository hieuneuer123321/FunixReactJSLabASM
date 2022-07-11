import React, { Component } from "react";
// import { Card, CardImg } from "reactstrap";
// import { Link } from "react-router-dom";
// import LoadingComponent from "./LoadingComponent";

export default class StaffOfDepartmentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffsOfDepartment: [],
    };
  }

  render() {
    console.log(this.props.staffOfDepartment);
    return <div className="">{this.props.departmentsId}</div>;
    // if (this.props.isLoading) {
    //   return <LoadingComponent />;
    // } else if (this.props.errorMessage) {
    //   return <h4>{this.props.errorMessage}</h4>;
    // } else {
    //   const RenderStaff = ({ staff, onClick }) => {
    //     const styleTextCard = {
    //       textAlign: "center",
    //       color: "black",
    //     };
    //     const styleCard = {
    //       marginBottom: "10px",
    //     };
    //     return (
    //       <Card style={styleCard}>
    //         <Link to={`/staff/${staff.id}`}>
    //           <CardImg width="100%" src={staff.image} alt={staff.name} />
    //           <h6 style={styleTextCard}>{staff.name}</h6>
    //         </Link>
    //       </Card>
    //     );
    //   };
    //   const staffList = this.props.staffs.map((staff) => {
    //     return (
    //       <div className="col-6 col-md-4 col-xl-2" key={staff.id}>
    //         <RenderStaff staff={staff} onClick={this.props.onClick} />
    //       </div>
    //     );
    //   });
    //   return (
    //     <div className="container">
    //       <div className="row">
    //         <div className="col-12 col-md-6 mt-3">
    //           <div className="row">
    //             <div className="col-10 col-md-10 ">
    //               <h3>Tất Cả Nhân Viên Của Phòng Ban</h3>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="row">{staffList}</div>
    //     </div>
    //   );
    // }
  }
}
