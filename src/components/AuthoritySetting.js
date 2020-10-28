import React, { Component } from "react";
import axios from "axios";
import { Button, Form, Label, Input } from "reactstrap";
import { Helmet } from "react-helmet";

class AuthoritySetting extends Component {
  state = {
    roleName: "",
    email: "",
    responseMessage: "",
    name: "",
  };
  _onBlur = (event) => {
    this.setState({ name: event.target.value });
    this.createSelectItems(event.target.value);
  };

  createSelectItems(props) {
    axios
      .get("http://localhost:8001/api/auth/checkUser/" + props)
      .then((response) => {
        this.setState({ email: response.data.email });
        this.setState({ roleName: response.data.roles[0].name });
        if (this.state.roleName === "ROLE_USER") {
          this.setState({ responseMessage: "Current role is USER" });
        } else if (this.state.roleName === "ROLE_DOCTOR") {
          this.setState({ responseMessage: "Current role is DOCTOR" });
        } else {
          this.setState({ responseMessage: "Current role is NURSE" });
        }
      })
      .catch((error) => {
        this.setState({
          responseMessage: "Error: The entered user name is not present",
        });
      });
  }

  setOptionValues() {
    const authOptions = ["ROLE_USER", "ROLE_DOCTOR", "ROLE_NURSE"];
    let items = [];
    let filteredOptions = authOptions.filter(
      (option) => option !== this.state.roleName
    );

    for (let i = 0; i < filteredOptions.length; i++) {
      items.push(
        <option key={filteredOptions[i]} value={filteredOptions[i]}>
          {filteredOptions[i]}
        </option>
      );
    }
    return items;
  }

  registerValuesHandler = () => {
    const updateAuthorityValue = {
      username: this.state.name,
      roles: [this.role.value],
    };
    axios
      .post(
        "http://localhost:8001/api/auth/updateAuthority",
        updateAuthorityValue
      )
      .then((res) => {
        this.props.history.push("/authorityMessage");
      });
  };

  render() {
    return (
      <Form className="patient-form">
        <Helmet>
          <title>Authority Setting • Apollo Hospitals</title>
        </Helmet>
        <center>
          <h2>Authority Setting</h2>
        </center>
        <Label>Enter User Name</Label>
        <Input type="text" onBlur={this._onBlur} />
        <Label>
          <b>{this.state.responseMessage}</b>
        </Label>
        <Label>Email ID</Label>
        <Input type="text" disabled value={this.state.email} />
        <Label>Select Role</Label>
        <select ref={(input) => (this.role = input)} className="form-control">
          if({this.state.roleName} != {null}){this.setOptionValues()}
        </select>
        <br></br>
        <br></br>
        <Button
          className="btn-lg btn-dark btn-block"
          onClick={this.registerValuesHandler}
        >
          Change Authority
        </Button>
        <br></br>
        <br></br>
      </Form>
    );
  }
}
export default AuthoritySetting;
