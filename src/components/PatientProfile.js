import React, { Component } from "react";
import { Form, Label, Input } from "reactstrap";
import axios from "axios";
import { Helmet } from "react-helmet";
class PatientProfile extends Component {
  state = {
    name: "",
    dob: "",
    sex: "",
    email: "",
    phnNumber: "",
    address: "",
    profileMessage: "",
    age: "",
    bloodGroup: "",
    emerName: "",
    emerPhnNumber: "",
    emerRelation: "",
  };
  async getPatientData() {
    let urlElements = window.location.href.split("/");
    axios
      .get("http://localhost:8003/patients/patient/" + urlElements[4])
      .then((res) => {
        this.setState({
          name: res.data.name,
          dob: res.data.dob,
          sex: res.data.sex,
          email: res.data.email,
          phnNumber: res.data.phnNumber,
          address: res.data.address,
          profileMessage: res.data.name,
          age: res.data.age,
          bloodGroup: res.data.bloodGroup,
          emerName: res.data.emergencyContact.emerName,
          emerPhnNumber: res.data.emergencyContact.emerPhnNumber,
          emerRelation: res.data.emergencyContact.emerRelation,
        });
      });
  }
  async getVitalData() {
    let urlElements = window.location.href.split("/");
    axios
      .get("http://localhost:8002/vital/lastVisited/" + urlElements[4])
      .then((res) => {
        this.setState({
          profileMessage: this.state.profileMessage + " ( " + res.data + " )",
        });
      });
  }
  componentDidMount() {
    this.getPatientData();
    this.getVitalData();
  }
  render() {
    return (
      <Form className="patient-form">
        <Helmet>
          <title>Patient Profile • Apollo Hospitals</title>
        </Helmet>
        <center>
          <h2>{this.state.profileMessage}</h2>
        </center>
        <Label>Name</Label>
        <Input type="text" value={this.state.name} disabled />
        <Label>Date of Birth</Label>
        <Input type="text" value={this.state.dob} disabled />
        <Label>Age</Label>
        <Input type="text" value={this.state.age} disabled />
        <Label>Sex</Label>
        <Input type="text" value={this.state.sex} disabled />
        <Label>Blood Group</Label>
        <Input type="text" value={this.state.bloodGroup} disabled />
        <Label>Email</Label>
        <Input type="text" value={this.state.email} disabled />
        <Label>Phone Number</Label>
        <Input type="text" value={this.state.phnNumber} disabled />
        <Label>Address</Label>
        <Input type="text" value={this.state.address} disabled />
        <br></br>
        <br></br>
        <Label>
          <b>Emergency Contact Details</b>
        </Label>
        <br></br>
        <Label>Name</Label>
        <Input type="text" value={this.state.emerName} disabled />
        <Label>Relation With the Patient</Label>
        <Input type="text" value={this.state.emerRelation} disabled />
        <Label>Phone Number</Label>
        <Input type="text" value={this.state.emerPhnNumber} disabled />
        <br></br>
        <br></br>
      </Form>
    );
  }
}
export default PatientProfile;
