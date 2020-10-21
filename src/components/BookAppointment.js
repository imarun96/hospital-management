import React, { Component } from "react";
import axios from "axios";
import AuthService from "../services/auth.service";
import { Button, Form, Label, Input } from "reactstrap";
import { Helmet } from "react-helmet";
class BookAppointment extends Component {
  state = {
    date: "",
    name: "",
    phnNumber: "",
    date: "",
    docType: "",
    maxNumber: "",
    res: "",
  };
  handleDate = (event) => {
    this.setState({ date: event.target.value }, () => {
      this.getTimeSlots();
      this.setState({ res: "" });
      this.setState({ maxNumber: "" });
    });
  };
  createSelectItems() {
    let items = [];
    for (let i = 0; i < this.state.maxNumber; i++) {
      items.push(
        <option key={this.state.res[i]} value={this.state.res[i]}>
          {this.state.res[i]}
        </option>
      );
    }
    return items;
  }
  handleDocType = () => {
    this.setState({ docType: this.doctorType.value });
    this.getTimeSlots();
    this.setState({ res: "" });
    this.setState({ maxNumber: "" });
  };
  handleName = (event) => {
    this.setState({ name: event.target.value });
  };
  handlePhoneNumber = (event) => {
    this.setState({ phnNumber: event.target.value });
  };
  getTimeSlots() {
    axios
      .get(
        "http://localhost:8004/book/timeSlots/" +
          this.state.date +
          "/" +
          this.doctorType.value
      )
      .then((res) => {
        this.setState({ res: res.data });
        this.setState({ maxNumber: res.data.length });
      });
  }
  registerValuesHandler = () => {
    const currentUser = AuthService.getCurrentUser().username;
    const bookingData = {
      name: this.state.name,
      date: this.state.date,
      phnNumber: this.state.phnNumber,
      timeSlot: this.timeSlot.value,
      docType: this.doctorType.value,
      inputUserId: currentUser,
      lastUpdateUserId: currentUser,
    };
    axios
      .post("http://localhost:8004/book/appointment", bookingData)
      .then((res) => {
        this.props.history.push("/bookingResponse/" + res.data.booking_id);
      });
  };
  render() {
    return (
      <Form className="patient-form">
        <Helmet>
          <title>Book Appointment • Apollo Hospitals</title>
        </Helmet>
        <center>
          <h2>Book Appointment</h2>
        </center>
        <Label>Date</Label>
        <Input type="date" value={this.state.date} onChange={this.handleDate} />
        <Label>Doctor Name</Label>
        <select
          ref={(input) => (this.doctorType = input)}
          className="form-control"
          onChange={this.handleDocType}
        >
          <option value="Dermatologist">Dermatologist</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="General">General</option>
        </select>
        <Label>Time Slot</Label>
        <select
          required
          ref={(input) => (this.timeSlot = input)}
          className="form-control"
        >
          {this.createSelectItems()}
        </select>
        <Label>Name</Label>
        <Input type="text" onChange={this.handleName} />
        <Label>Phone Number</Label>
        <Input type="numeric" onChange={this.handlePhoneNumber} />
        <br></br>
        <br></br>
        <Button
          className="btn-lg btn-dark btn-block"
          onClick={this.registerValuesHandler}
        >
          Book
        </Button>
        <br></br>
        <br></br>
      </Form>
    );
  }
}
export default BookAppointment;
