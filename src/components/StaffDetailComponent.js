import React, { Component } from "react";
import dateFormat from "dateformat";
import {
  Breadcrumb,
  BreadcrumbItem,
  Media,
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
import { Link } from "react-router-dom";
import { FadeTransform } from "react-animation-components";
import LoadingComponent from "./LoadingComponent";

const required = (value) => value && value.length;
const lengthMax = (length) => (value) => !value || value.length <= length;
const lengthMin = (length) => (value) => !value || value.length >= length;
const isNumber = (value) => !value || !isNaN(Number(value));
class StaffDetail extends Component {
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
    };
    this.toggle = this.toggle.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
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
    }
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

  render() {
    if (this.props.isLoading) {
      return <LoadingComponent />;
    } else if (this.props.errorMessage) {
      return <h4>{this.props.errorMessage}</h4>;
    } else {
      const errors = this.validate(this.state.doB, this.state.startDate);
      console.log(this.props.staff);
      const department = this.props.departments.filter((department) => {
        return this.props.staff.departmentId === department.id;
      })[0];
      const departmentName = department
        ? department.name
        : this.props.staff.departmentId;
      return (
        <div className="container">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/staffs">Nhân Viên</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{this.props.staff.name}</BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div className="row" style={{ margin: "0px 0px 20px 2px" }}>
            <button
              className="btn btn-primary"
              outline
              onClick={this.toggle}
              style={{ width: "150px" }}
            >
              Update
            </button>
          </div>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>
              Sửa Thông Tin Nhân Viên
            </ModalHeader>
            <ModalBody>
              <LocalForm
                className="form-group-row"
                onSubmit={(values) => this.handleSubmit(values)}
              >
                <Row className="control-group" style={{ marginBottom: "20px" }}>
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
                        maxLength: "Tên Nhân Viên Phải Nhỏ Hơn 30 ký tự",
                        minLength: "Tên Nhân Viên Phải Lớn Hơn 2 ký tự",
                      }}
                    ></Errors>
                  </Col>
                </Row>
                <Row className="control-group" style={{ marginBottom: "20px" }}>
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
                      value={this.props.staff.doB}
                      onBlur={this.handleBlur("doB")}
                      valid={errors.doB === ""}
                      invalid={errors.doB !== ""}
                      required
                    />
                    <FormFeedback>{errors.doB}</FormFeedback>
                  </Col>
                </Row>
                <Row className="control-group" style={{ marginBottom: "20px" }}>
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
                <Row className="control-group" style={{ marginBottom: "20px" }}>
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
                <Row className="control-group" style={{ marginBottom: "20px" }}>
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
                <Row className="control-group" style={{ marginBottom: "20px" }}>
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
                <Row className="control-group" style={{ marginBottom: "20px" }}>
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
                  Sửa Nhân Viên
                </Button>
              </LocalForm>
            </ModalBody>
          </Modal>
          <div className="row">
            <Media className="col-12 col-md-4 col-xl-3">
              <FadeTransform
                in
                transformProps={{
                  exitTransform: "scale(0.5) translateY(-50%)",
                }}
              >
                <Media
                  object
                  src={this.props.staff.image}
                  alt="image"
                  height="220px"
                  width="100%"
                />
              </FadeTransform>
            </Media>
            <Media body className="col-12 col-md-8 col-xl-9">
              <Media heading>{this.props.staff.name}</Media>
              <p>
                {" "}
                Ngày Sinh: {dateFormat(this.props.staff.doB, "dd/mm/yyyy")}
              </p>
              <p>
                Ngày Vào Công Ty:{" "}
                {dateFormat(this.props.staff.startDate, "dd/mm/yyyy")}
              </p>
              <p>
                {" "}
                Phòng Ban:{" "}
                {departmentName
                  ? departmentName
                  : this.props.staff.departmentId}
              </p>
              <p> Số Ngày Nghỉ Còn Lại: {this.props.staff.annualLeave}</p>
              <p> Số Ngày Đã Làm Thêm: {this.props.staff.overTime}</p>
            </Media>
          </div>
        </div>
      );
    }
  }
}
export default StaffDetail;
