import React, { Component } from "react";
import axios from "axios";
import AuthService from "../services/auth.service";
import { Button, Form, Label, Input } from "reactstrap";
import { Helmet } from "react-helmet";
class VitalCheckUp extends Component {
  state = {
    name: "",
    checkUpDate: "",
    bodyTemp: "",
    res: "",
    maxNumber: "",
  };
  handleCheckUpDate = (event) => {
    this.setState({ checkUpDate: event.target.value });
  };
  handleBodyTemp = (event) => {
    this.setState({ bodyTemp: event.target.value });
  };
  async getUsersData() {
    this.setState({
      res: await axios.get("http://localhost:8003/patients/patient"),
    });
    this.setState({
      maxNumber: this.state.res.data.length,
    });
  }
  componentDidMount() {
    this.getUsersData();
  }
  createSelectItems() {
    let items = [];
    for (let i = 0; i < this.state.maxNumber; i++) {
      items.push(
        <option
          key={this.state.res.data[i].patient_id}
          value={this.state.res.data[i].patient_id}
        >
          {this.state.res.data[i].name}
        </option>
      );
    }
    return items;
  }
  registerValuesHandler = () => {
    const currentUser = AuthService.getCurrentUser().username;
    const vitalCheckData = {
      patient_id: this.patient_name.value,
      check_up_date: this.state.checkUpDate,
      temperature: this.state.bodyTemp + " °C",
      pulseRate: this.pulseRate.value,
      bloodPressure: this.bloodPressure.value,
      respirationRate: this.respirationRate.value,
      inputUserId: currentUser,
      lastUpdateUserId: currentUser,
    };
    axios
      .post("http://localhost:8002/vital/checkup", vitalCheckData)
      .then((res) => {
        this.props.history.push("/vitalprofile/" + res.data.record_id);
      });
  };
  render() {
    return (
      <Form className="vital-form">
        <Helmet>
          <title>Vital Sign Entry • Apollo Hospitals</title>
        </Helmet>
        <center>
          <h2>Vital Sign Entry</h2>
        </center>
        <Label>Patient Name</Label>
        <select
          ref={(input) => (this.patient_name = input)}
          className="form-control"
        >
          {this.createSelectItems()}
        </select>
        <p>
          {" "}
          Cannot find Patient Name ? Register
          <a href="newPatient" target="_blank">
            {" "}
            here
          </a>
        </p>
        <Label>Check Up Date</Label>
        <Input type="date" onChange={this.handleCheckUpDate} />
        <Label>Body Temperature</Label>
        <Input type="text" placeholder="in °C" onChange={this.handleBodyTemp} />
        <Label>Pulse Rate</Label>
        <select
          ref={(input) => (this.pulseRate = input)}
          className="form-control"
        >
          <option value="Normal">Normal</option>
          <option value="High">High</option>
        </select>
        <Label>Respiration Rate</Label>
        <select
          ref={(input) => (this.respirationRate = input)}
          className="form-control"
        >
          <option value="Normal">Normal</option>
          <option value="High">High</option>
        </select>

        <Label>Blood pressure</Label>
        <select
          ref={(input) => (this.bloodPressure = input)}
          className="form-control"
        >
          <option value="Normal">Normal</option>
          <option value="Elevated">Elevated</option>
          <option value="Stage 1">Stage 1</option>
          <option value="Stage 2">Stage 2</option>
        </select>

        <br></br>
        <Button
          className="btn-lg btn-dark btn-block"
          onClick={this.registerValuesHandler}
        >
          Register
        </Button>
      </Form>
    );
  }
}
export default VitalCheckUp;
