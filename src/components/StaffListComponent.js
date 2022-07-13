import React, { Component } from "react";
import {
  Card,
  CardImg,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Input,
  Row,
  Col,
  FormFeedback,
  Button,
} from "reactstrap";
import { Control, Errors, LocalForm } from "react-redux-form";
import { FadeTransform } from "react-animation-components";
import { Link } from "react-router-dom";
import LoadingComponent from "./LoadingComponent";

const required = (value) => value && value.length;
const lengthMax = (length) => (value) => !value || value.length <= length;
const lengthMin = (length) => (value) => !value || value.length >= length;
const isNumber = (value) => !value || !isNaN(Number(value));
class Staffs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doB: "",
      startDate: "",
      salary: 30000,
      touched: {
        name: false,
        doB: false,
        startDate: false,
      },
      nameFind: "",
      modal: false,
    };
    this.toggle = this.toggle.bind(this);
    this.search = this.search.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.onDeleteStaff = this.onDeleteStaff.bind(this);
  }

  handleBlur = (field) => (event) => {
    this.setState({ touched: { ...this.state.touched, [field]: true } });
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(value) {
    this.toggle();
    const newStaff = {
      name: value.name,
      doB: this.state.doB,
      salaryScale: value.salaryScale ? value.salaryScale : 1,
      startDate: this.state.startDate,
      departmentId: value.department ? value.department : "Dept01",
      annualLeave: value.annualLeave ? value.annualLeave : 0,
      overTime: value.overTime ? value.overTime : 0,
      image: "/assets/images/alberto.png",
      salary: 3000,
    };
    if (!this.state.doB || !this.state.startDate) {
      this.setState({ touched: { doB: true, startDate: true } });
    } else {
      console.log(newStaff);
      this.props.postAddStaff(
        newStaff.name,
        newStaff.doB,
        newStaff.salaryScale,
        newStaff.departmentId,
        newStaff.startDate,
        newStaff.annualLeave,
        newStaff.overTime,
        newStaff.image,
        newStaff.salary
      );
    }
  }
  search(event) {
    event.preventDefault();
    const name = event.target.nameStaff.value;
    this.setState({ nameFind: name });
  }
  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  validate(doB, startDate) {
    const errors = {
      doB: "",
      startDate: "",
    };
    if (this.state.touched.doB && doB.length === 0) {
      errors.doB = "Yêu Cầu Nhập";
    }
    if (this.state.touched.startDate && startDate.length === 0) {
      errors.startDate = "Yêu Cầu Nhập";
    }
    return errors;
  }
  onDeleteStaff(id) {
    const selectConfirm = window.confirm(
      "Are you sure you want to delete this"
    );
    if (selectConfirm) {
      this.props.deleteStaff(id);
    } else {
    }
  }
  render() {
    if (this.props.isLoading) {
      return <LoadingComponent />;
    } else if (this.props.errorMessage) {
      return <h4>{this.props.errorMessage}</h4>;
    } else {
      const errors = this.validate(this.state.doB, this.state.startDate);
      const RenderStaff = ({ staff, deleteStaff }) => {
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
            <button
              className="btn btn-danger"
              outline
              onClick={() => this.onDeleteStaff(staff.id)}
            >
              Delete
            </button>
          </Card>
        );
      };
      const staffList = this.props.staffs
        .filter((staff) => {
          if (this.state.nameFind === "") return staff;
          else if (
            staff.name.toLowerCase().includes(this.state.nameFind.toLowerCase())
          )
            return staff;
          return 0;
        })
        .map((staff) => {
          return (
            <div className="col-6 col-md-4 col-xl-2" key={staff.id}>
              <RenderStaff staff={staff} deleteStaff={this.props.deleteStaff} />
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
                    onClick={this.toggle}
                  >
                    <span
                      className="fa fa-plus fa-lg"
                      aria-hidden="true"
                    ></span>
                  </button>
                  <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                      Thêm Nhân Viên
                    </ModalHeader>
                    <ModalBody>
                      <LocalForm
                        className="form-group-row"
                        onSubmit={(values) => this.handleSubmit(values)}
                      >
                        <Row
                          className="control-group"
                          style={{ marginBottom: "20px" }}
                        >
                          <Label htmlFor="name" md={4}>
                            Name
                          </Label>
                          <Col md={8}>
                            <Control.text
                              model=".name"
                              name="name"
                              id="name"
                              placeholder="Tên Nhân Viên"
                              className="form-control"
                              validators={{
                                required,
                                maxLength: lengthMax(30),
                                minLength: lengthMin(3),
                              }}
                            />

                            <Errors
                              model=".name"
                              className="text-danger"
                              show="touched"
                              messages={{
                                required: "Yêu Cầu Nhập",
                                maxLength:
                                  "Tên Nhân Viên Phải Nhỏ Hơn 30 ký tự",
                                minLength: "Tên Nhân Viên Phải Lớn Hơn 2 ký tự",
                              }}
                            ></Errors>
                          </Col>
                        </Row>
                        <Row
                          className="control-group"
                          style={{ marginBottom: "20px" }}
                        >
                          <Label htmlFor="DateBird" md={4}>
                            Ngày Sinh
                          </Label>
                          <Col md={8}>
                            <Input
                              type="date"
                              name="doB"
                              id="DateBird"
                              placeholder="date placeholder"
                              className="form-control"
                              onChange={this.handleInputChange}
                              value={this.state.doB}
                              onBlur={this.handleBlur("doB")}
                              valid={errors.doB === ""}
                              invalid={errors.doB !== ""}
                              required
                            />
                            <FormFeedback>{errors.doB}</FormFeedback>
                          </Col>
                        </Row>
                        <Row
                          className="control-group"
                          style={{ marginBottom: "20px" }}
                        >
                          <Label htmlFor="startDate" md={4}>
                            Ngày Vào Công Ty
                          </Label>
                          <Col md={8}>
                            <Input
                              type="date"
                              name="startDate"
                              id="startDate"
                              placeholder="date placeholder"
                              className="form-control"
                              onChange={this.handleInputChange}
                              value={this.state.startDate}
                              onBlur={this.handleBlur("startDate")}
                              valid={errors.startDate === ""}
                              invalid={errors.startDate !== ""}
                              required
                            />
                            <FormFeedback>{errors.startDate}</FormFeedback>
                          </Col>
                        </Row>
                        <Row
                          className="control-group"
                          style={{ marginBottom: "20px" }}
                        >
                          <Label htmlFor="department" md={4}>
                            Phòng Ban
                          </Label>
                          <Col md={8}>
                            <Control.select
                              model=".department"
                              name="department"
                              id="department"
                              className="form-control"
                            >
                              <option value="Dept01">Sale</option>
                              <option value="Dept02">HR</option>
                              <option value="Dept03">Marketing</option>
                              <option value="Dept04">IT</option>
                              <option value="Dept05">Finance</option>
                            </Control.select>
                          </Col>
                        </Row>
                        <Row
                          className="control-group"
                          style={{ marginBottom: "20px" }}
                        >
                          <Label htmlFor="salaryScale" md={4}>
                            Hệ Số Lương
                          </Label>
                          <Col md={8}>
                            <Control.text
                              model=".salaryScale"
                              name="salaryScale"
                              id="salaryScale"
                              className="form-control"
                              placeholder="1"
                              validators={{ isNumber }}
                            />
                            <Errors
                              model=".salaryScale"
                              className="text-danger"
                              show="touched"
                              messages={{
                                isNumber: "Nhập phải Là Số",
                              }}
                            ></Errors>
                          </Col>
                        </Row>
                        <Row
                          className="control-group"
                          style={{ marginBottom: "20px" }}
                        >
                          <Label htmlFor="annualLeave" md={4}>
                            Số Ngày Nghỉ Còn Lại
                          </Label>
                          <Col md={8}>
                            <Control.text
                              model=".annualLeave"
                              name="annualLeave"
                              id="annualLeave"
                              className="form-control"
                              placeholder="0"
                              validators={{ isNumber }}
                            />
                            <Errors
                              model=".annualLeave"
                              className="text-danger"
                              show="touched"
                              messages={{ isNumber: "Nhập Phải Là Số" }}
                            ></Errors>
                          </Col>
                        </Row>
                        <Row
                          className="control-group"
                          style={{ marginBottom: "20px" }}
                        >
                          <Label htmlFor="overTime" md={4}>
                            Số Ngày Đã Làm Thêm
                          </Label>
                          <Col md={8}>
                            <Control.text
                              model=".overTime"
                              name="overTime"
                              id="overTime"
                              className="form-control"
                              placeholder="0"
                              validators={{ isNumber }}
                            />
                            <Errors
                              model=".overTime"
                              className="text-danger"
                              show="touched"
                              messages={{ isNumber: "Nhập Phải Là Số" }}
                            ></Errors>
                          </Col>
                        </Row>

                        <Button type="submit" className="btn btn-success">
                          Thêm Nhân Viên
                        </Button>
                      </LocalForm>
                    </ModalBody>
                  </Modal>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 mt-3">
              <form onSubmit={this.search} className="form-group row">
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
          </div>{" "}
          <FadeTransform
            in
            transformProps={{
              exitTransform: "scale(0.5) translateY(-50%)",
            }}
          >
            <div className="row">{staffList}</div>
          </FadeTransform>
        </div>
      );
    }
  }
}

export default Staffs;
