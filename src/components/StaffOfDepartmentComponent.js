import React, { Component } from "react";
import { Card, CardImg } from "reactstrap";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { baseUrl } from "../shared/baseURL";
import LoadingComponent from "./LoadingComponent";

export default class StaffOfDepartmentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      staffOfDepartment: [],
      errorMessage: null,
    };
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(baseUrl + "departments/" + this.props.departmentsId)
      .then(
        (response) => {
          if (response.ok) return response;
          else {
            const errorMessage = new Error(
              `Error ${response.status} : ${response.statusText}`
            );
            errorMessage.response = response;
            throw errorMessage;
          }
        },
        (err) => {
          const errorMessage = new Error(err.message);
          throw errorMessage;
        }
      )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ staffOfDepartment: data, isLoading: false });
        return data;
      })
      .catch((err) => {
        this.setState({ errorMessage: err.message, isLoading: false });
        return err.message;
      });
  }

  render() {
    const departmentsName = this.props.departmentsName
      ? this.props.departmentsName.name
      : "";
    if (this.state.isLoading) {
      return <LoadingComponent />;
    } else if (this.state.errorMessage) {
      return <h4>{this.state.errorMessage}</h4>;
    } else {
      const RenderStaff = ({ staff, onClick }) => {
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
      };
      const staffList = this.state.staffOfDepartment.map((staff) => {
        return (
          <div className="col-6 col-md-4 col-xl-2" key={staff.id}>
            <RenderStaff staff={staff} onClick={this.props.onClick} />
          </div>
        );
      });
      return (
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 mt-3">
              <div className="row">
                <div className="col-10 col-md-10 ">
                  <Breadcrumb>
                    <BreadcrumbItem>
                      <Link to="/departments">Phòng Ban</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>{departmentsName}</BreadcrumbItem>
                  </Breadcrumb>
                </div>
              </div>
            </div>
          </div>
          <div className="row">{staffList}</div>
        </div>
      );
    }
  }
}
