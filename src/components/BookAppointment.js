import React, { Component } from "react";
import axios from "axios";
import AuthService from "../services/auth.service";
import { Button, Form, Label, Input } from "reactstrap";
import { Helmet } from "react-helmet";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import NumberFormat from "react-number-format";

class BookAppointment extends Component {
  state = {
    date: "",
    name: "",
    phnNumber: "",
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
    if (this.state.maxNumber === 0) {
      store.addNotification({
        title: "Timeslot not available",
        message:
          "All timings has been booked for the date - " +
          this.state.date +
          ". Try with different date.",
        type: "info",
        container: "bottom-left",
        insert: "top",
        dismiss: {
          duration: 3500,
        },
      });
    }
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
    this.setState({ name: event.target.value.trim() });
  };
  handlePhoneNumber = (event) => {
    this.setState({ phnNumber: event.target.value });
  };
  getTimeSlots() {
    if (this.state.date !== "") {
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
    const lengthOfName = this.state.name.length;
    if (
      this.state.date === "" &&
      this.state.name === "" &&
      this.state.phnNumber === ""
    ) {
      store.addNotification({
        title: "Validation Error",
        message: "Date, Name, Phone Number fields are mandatory.",
        type: "danger",
        container: "bottom-left",
        insert: "top",
        dismiss: {
          duration: 3500,
        },
      });
    } else if (this.state.date === "") {
      store.addNotification({
        title: "Validation Error",
        message: "Date is required.",
        type: "danger",
        container: "bottom-left",
        insert: "top",
        dismiss: {
          duration: 3500,
        },
      });
    } else if (this.state.name.trim() === "") {
      store.addNotification({
        title: "Validation Error",
        message: "Name is required.",
        type: "danger",
        container: "bottom-left",
        insert: "top",
        dismiss: {
          duration: 3500,
        },
      });
    } else if (this.state.name.length > 25) {
      store.addNotification({
        title: "Validation Error",
        message: "Name: Only 25 characters are allowed.",
        type: "danger",
        container: "bottom-left",
        insert: "top",
        dismiss: {
          duration: 3500,
        },
      });
    } else if (this.state.phnNumber === "") {
      store.addNotification({
        title: "Validation Error",
        message: "Phone Number is required.",
        type: "danger",
        container: "bottom-left",
        insert: "top",
        dismiss: {
          duration: 3500,
        },
      });
    }
    if (
      this.state.date !== "" &&
      this.state.name !== "" &&
      this.state.phnNumber !== "" &&
      lengthOfName <= 25
    ) {
      let isTimeSlotAvailable = false;
      axios
        .get(
          "http://localhost:8004/book/timeSlots/" +
            this.state.date +
            "/" +
            this.doctorType.value
        )
        .then((res) => {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i] === bookingData.timeSlot) {
              console.log("Inside if statement");
              isTimeSlotAvailable = true;
            }
          }
          if (isTimeSlotAvailable) {
            axios
              .post("http://localhost:8004/book/appointment", bookingData)
              .then((res) => {
                const bookingId = res.data.booking_id;
                store.addNotification({
                  title:
                    "Appointment has been recorded. Do check mails for the approval from hospital.",
                  message: "Your Booking ID - " + bookingId,
                  type: "success",
                  container: "bottom-left",
                  insert: "top",
                  dismiss: {
                    duration: 3500,
                    showIcon: true,
                  },
                  width: 400,
                });
              });
            this.props.history.push("/yourAppointments/");
          } else {
            store.addNotification({
              title: "Time slot has been taken.",
              message: "The selected Time Slot has been booked by another user",
              type: "danger",
              container: "bottom-left",
              insert: "top",
              dismiss: {
                duration: 3500,
                showIcon: true,
              },
              width: 400,
            });
            this.props.history.push("/appointment/");
          }
        });
    }
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
        <Label>Available Time Slot</Label>
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
        <NumberFormat
          format="+91  #####-#####"
          mask="_"
          onChange={this.handlePhoneNumber}
        />
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
