import React, { Component } from "react";
import axios from "axios";
import AuthService from "../services/auth.service";
import { Button, Form, Label, Input } from "reactstrap";
import { Helmet } from "react-helmet";
import LocationSearchModal from "./LandingPage";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
class NewPatientEntryHandler extends Component {
  state = {
    name: "",
    dob: "",
    email: "",
    phoneNumber: "",
    address: "",
    emerName: "",
    emerPhnNumber: "",
  };
  handleUserName = (event) => {
    this.setState({ name: event.target.value });
  };
  handleDob = (event) => {
    this.setState({ dob: event.target.value });
  };
  handleEmail = (event) => {
    this.setState({ email: event.target.value });
  };
  handlePhoneNumber = (event) => {
    this.setState({ phoneNumber: event.target.value });
  };
  handleAddress = (event) => {
    this.setState({ address: event.target.value });
  };
  handleEmerName = (event) => {
    this.setState({ emerName: event.target.value });
  };
  handleEmerPhnNumber = (event) => {
    this.setState({ emerPhnNumber: event.target.value });
  };
  registerValuesHandler = () => {
    const currentUser = AuthService.getCurrentUser().username;
    const patientData = {
      name: this.state.name,
      dob: this.state.dob,
      sex: this.sexOption.value,
      email: this.state.email,
      bloodGroup: this.bloodGroupOption.value,
      phnNumber: this.state.phoneNumber,
      address: this.state.address,
      inputUserId: currentUser,
      lastUpdateUserId: currentUser,
      emergencyContact: {
        emerName: this.state.emerName,
        emerPhnNumber: this.state.emerPhnNumber,
        emerRelation: this.relationship.value,
      },
    };
    axios
      .post("http://localhost:8003/patients/patient", patientData)
      .then((res) => {
        store.addNotification({
          title: "Record added successfully",
          message: res.data.name+" was added to Patient Database",
          type: "success",
          container: "bottom-left",
          insert: "top",
          dismiss: {
            duration: 3500,
          },
        });
        this.props.history.push("/patientprofile/" + res.data.patient_id);
      });
  };

  render() {
    return (
      <Form className="patient-form">
        <Helmet>
          <title>Patient Entry • Apollo Hospitals</title>
        </Helmet>
        <center>
          <h2>Create new Patient Entry</h2>
        </center>
        <Label>Name</Label>
        <Input type="text" placeholder="Name" onChange={this.handleUserName} />
        <Label>Date of Birth</Label>
        <Input type="date" onChange={this.handleDob} />
        <Label>Sex</Label>
        <select
          ref={(input) => (this.sexOption = input)}
          className="form-control"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <Label>Blood Group</Label>
        <select
          ref={(input) => (this.bloodGroupOption = input)}
          className="form-control"
        >
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB">AB</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
        <Label>Email</Label>
        <Input type="email" onChange={this.handleEmail} />
        <Label>Phone Number</Label>
        <Input type="numeric" onChange={this.handlePhoneNumber} />
        <Label>Address</Label>
        <LocationSearchModal />
        <Input type="text" onChange={this.handleAddress} />
        <br></br>
        <Label>
          <b>Emergency Contact Details</b>
        </Label>
        <br></br>
        <Label>Name</Label>
        <Input type="text" onChange={this.handleEmerName} />
        <Label>Relation With the Patient</Label>
        <select
          ref={(input) => (this.relationship = input)}
          className="form-control"
        >
          <option value="Father">Father</option>
          <option value="Mother">Mother</option>
          <option value="Husband">Husband</option>
          <option value="Wife">Wife</option>
          <option value="Brother">Brother</option>
          <option value="Sister">Sister</option>
          <option value="Friend">Friend</option>
        </select>
        <Label>Phone Number</Label>
        <Input type="numeric" onChange={this.handleEmerPhnNumber} />
        <br></br>
        <br></br>
        <Button
          className="btn-lg btn-dark btn-block"
          onClick={this.registerValuesHandler}
        >
          Register
        </Button>
        <br></br>
        <br></br>
      </Form>
    );
  }
}
export default NewPatientEntryHandler;
