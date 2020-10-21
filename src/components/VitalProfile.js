import React, { Component } from "react";
import { Form, Label, Input } from "reactstrap";
import axios from "axios";
import { Helmet } from "react-helmet";
class VitalProfile extends Component {
  state = {
    patient_id: "",
    name: "",
    age: "",
    sex: "",
    bloodGroup: "",
    check_up_date: "",
    temperature: "",
    pulseRate: "",
    respirationRate: "",
    bloodPressure: "",
    url: "",
  };

  async getVitalData() {
    let urlElements = window.location.href.split("/");
    await axios
      .get("http://localhost:8002/vital/checkup/" + urlElements[4])
      .then((res) => {
        this.setState({
          patient_id: res.data.patient_id,
          temperature: res.data.temperature,
          check_up_date: res.data.check_up_date,
          pulseRate: res.data.pulseRate,
          bloodPressure: res.data.bloodPressure,
          respirationRate: res.data.respirationRate,
          url: "/patientprofile/" + res.data.patient_id,
        });
      });
    this.getPatientData();
  }
  async getPatientData() {
    await axios
      .get("http://localhost:8003/patients/patient/" + this.state.patient_id)
      .then((res) => {
        this.setState({
          name: res.data.name,
          age: res.data.age,
          sex: res.data.sex === 1 ? "Male" : "Female",
          bloodGroup: res.data.bloodGroup,
        });
      });
  }
  componentDidMount() {
    this.getVitalData();
  }
  render() {
    return (
      <Form className="patient-form">
        <Helmet>
          <title>Vital Sign Profile • Apollo Hospitals</title>
        </Helmet>
        <center>
          <h2>Vital Sign Entry</h2>
        </center>
        <Label>Name</Label>
        <Input type="text" value={this.state.name} disabled />
        <p>
          <a href={this.state.url} target="_blank">
            View Patient Profile
          </a>
        </p>
        <Label>Age</Label>
        <Input type="text" value={this.state.age} disabled />
        <Label>Sex</Label>
        <Input type="text" value={this.state.sex} disabled />
        <Label>Blood Group</Label>
        <Input type="text" value={this.state.bloodGroup} disabled />
        <Label>Check Up Date</Label>
        <Input type="text" value={this.state.check_up_date} disabled />
        <Label>Body Temperature</Label>
        <Input type="text" value={this.state.temperature} disabled />
        <Label>Pulse Rate</Label>
        <Input type="text" value={this.state.pulseRate} disabled />
        <Label>Respiration Rate</Label>
        <Input type="text" value={this.state.respirationRate} disabled />
        <Label>Blood pressure</Label>
        <Input type="text" value={this.state.bloodPressure} disabled />
      </Form>
    );
  }
}
export default VitalProfile;
