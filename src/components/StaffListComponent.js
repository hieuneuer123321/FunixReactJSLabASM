import React, { Component } from "react";
import {
  Card,
  CardImg,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Label,
  Input,
  Row,
  Col,
  FormFeedback,
} from "reactstrap";
import { Link } from "react-router-dom";

class Staffs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      doB: "",
      salaryScale: 1,
      startDate: "",
      department: "Sale",
      annualLeave: 0,
      overTime: 0,
      salary: 30000,
      image: "/assets/images/alberto.png",
      touched: {
        name: false,
        doB: false,
        salaryScale: false,
        startDate: false,
        department: false,
        annualLeave: false,
        overTime: false,
      },
      nameFind: "",
      modal: false,
    };
    this.toggle = this.toggle.bind(this);
    this.search = this.search.bind(this);
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
  handleSubmit(event) {
    const newStaff = {
      name: this.state.name,
      doB: this.state.doB,
      salaryScale: this.state.salaryScale,
      startDate: this.state.startDate,
      department: this.state.department,
      annualLeave: this.state.annualLeave,
      overTime: this.state.overTime,
      image: this.state.image,
    };
    this.props.addStaff(newStaff);
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
  validate(name, doB, startDate) {
    const errors = {
      name: "",
      doB: "",
      startDate: "",
    };
    if (this.state.touched.name && name.length === 0) {
      errors.name = "Yêu Cầu Nhập";
    } else if (this.state.touched.name && name.length < 3) {
      errors.name = "Tên Nhân Viên Phải Lớn Hơn 3 Ký Tự";
    } else if (this.state.touched.name && name.length > 30) {
      errors.name = "Tên Nhân Viên Phải Nhỏ Hơn 30 Ký Tự";
    }
    if (this.state.touched.doB && doB.length === 0) {
      errors.doB = "Yêu Cầu Nhập";
    }
    if (this.state.touched.startDate && startDate.length === 0) {
      errors.startDate = "Yêu Cầu Nhập";
    }
    return errors;
  }
  render() {
    console.log(this.props.staffs);
    const errors = this.validate(
      this.state.name,
      this.state.doB,
      this.state.startDate
    );

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
                <h3>Nhân Viên</h3>
              </div>
              <div className="col-2 col-auto ">
                <button
                  className="btn btn-primary"
                  outline
                  onClick={this.toggle}
                >
                  <span className="fa fa-plus fa-lg" aria-hidden="true"></span>
                </button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                  <ModalHeader toggle={this.toggle}>Thêm Nhân Viên</ModalHeader>
                  <ModalBody>
                    <Form
                      className="form-group-row"
                      onSubmit={this.handleSubmit}
                    >
                      <Row
                        className="control-group"
                        style={{ marginBottom: "20px" }}
                      >
                        <Label htmlFor="name" md={4}>
                          Name
                        </Label>
                        <Col md={8}>
                          <Input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Tên Nhân Viên"
                            className="form-control"
                            onChange={this.handleInputChange}
                            value={this.state.name}
                            onBlur={this.handleBlur("name")}
                            valid={errors.name === ""}
                            invalid={errors.name !== ""}
                          />
                          <FormFeedback>{errors.name}</FormFeedback>
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
                          />{" "}
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
                          />{" "}
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
                          <Input
                            type="select"
                            name="department"
                            id="department"
                            className="form-control"
                            onChange={this.handleInputChange}
                            value={this.state.department}
                          >
                            <option>Sale</option>
                            <option>HR</option>
                            <option>Marketing</option>
                            <option>IT</option>
                            <option>Finance</option>
                          </Input>
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
                          <Input
                            type="number"
                            name="salaryScale"
                            id="salaryScale"
                            className="form-control"
                            onChange={this.handleInputChange}
                            value={this.state.salaryScale}
                          />
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
                          <Input
                            type="number"
                            name="annualLeave"
                            id="annualLeave"
                            className="form-control"
                            onChange={this.handleInputChange}
                            value={this.state.annualLeave}
                          />
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
                          <Input
                            type="number"
                            name="overTime"
                            id="overTime"
                            className="form-control"
                            placeholder="0"
                            onChange={this.handleInputChange}
                            value={this.state.overtime}
                          />
                        </Col>
                      </Row>
                      <button type="submit" className="btn btn-success">
                        Thêm
                      </button>
                    </Form>
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
        </div>
        <div className="row">{staffList}</div>
      </div>
    );
  }
}

export default Staffs;
