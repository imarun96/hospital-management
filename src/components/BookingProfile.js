import React, { Component } from "react";
import { Form, Label, Input } from "reactstrap";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Button } from "reactstrap";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
class BookingProfile extends Component {
  state = {
    date: "",
    name: "",
    phnNumber: "",
    docType: "",
    reason: "",
    status: "",
  };
  async getBookingInfo() {
    let urlElements = window.location.href.split("/");
    axios
      .get("http://localhost:8004/book/appointment/" + urlElements[4])
      .then((res) => {
        this.setState({
          date: res.data.date,
          name: res.data.name,
          phnNumber: res.data.phnNumber,
          reason: res.data.reason,
          status: res.data.status,
          docType: res.data.docType,
        });
      });
  }
  componentDidMount() {
    this.getBookingInfo();
  }

  acceptHandler = () => {
    let bookingId = window.location.href.split("/");
    axios
      .get(
        "http://localhost:8004/book/appointment/" + bookingId[4] + "/Accepted"
      )
      .then((res) => {
        store.addNotification({
          title: "Accepted",
          message: "Booking status changed to Accepted",
          type: "success",
          container: "bottom-left",
          insert: "top",
          dismiss: {
            duration: 3500,
          },
        });
        window.location.reload();
      });
  };
  declineHandler = () => {
    let bookingId = window.location.href.split("/");
    axios
      .get(
        "http://localhost:8004/book/appointment/" + bookingId[4] + "/Declined"
      )
      .then((res) => {
        store.addNotification({
          title: "Declined",
          message: "Booking status changed to Declined",
          type: "success",
          container: "bottom-left",
          insert: "top",
          dismiss: {
            duration: 3500,
          },
        });
        window.location.reload();
      });
  };

  render() {
    return (
      <Form className="patient-form">
        <Helmet>
          <title>Appointment • Apollo Hospitals</title>
        </Helmet>
        <center>
          <h2>Appointment</h2>
        </center>
        <Label>Name</Label>
        <Input type="text" value={this.state.name} disabled />
        <Label>Phone Number</Label>
        <Input type="text" value={this.state.phnNumber} disabled />
        <Label>Date</Label>
        <Input type="text" value={this.state.date} disabled />
        <Label>Doctor</Label>
        <Input type="text" value={this.state.docType} disabled />
        <Label>Reason</Label>
        <Input type="text" value={this.state.reason} disabled />
        <Label>Status</Label>
        <Input type="text" value={this.state.status} disabled />
        <br></br>
        <br></br>
        <Button onClick={this.acceptHandler}>Accept</Button>
        <br></br>
        <br></br>
        <Button onClick={this.declineHandler}>Decline</Button>
      </Form>
    );
  }
}
export default BookingProfile;
