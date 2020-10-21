import React from "react";
import AuthService from "../services/auth.service";
import "../App.css";
import { Helmet } from "react-helmet";
import { Form, Label, Input } from "reactstrap";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  return (
    <Form className="patient-form">
      <Helmet>
        <title>Patient Profile • Apollo Hospitals</title>
        <style>{"body { background-color:   #E0FFFF; }"}</style>
      </Helmet>
      <br></br>
      <br></br>
      <center>
        <h2>Welcome {currentUser.username}</h2>
      </center>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <center>
        <Label>
          <b>Employee ID</b>
        </Label>
      </center>
      <center>
        <Input className="w-25" type="text" value={currentUser.id} disabled />
      </center>
      <br></br>
      <br></br>
      <center>
        <Label>
          <b>Email</b>
        </Label>
      </center>
      <center>
        <Input
          className="w-25"
          type="text"
          value={currentUser.email}
          disabled
        />
      </center>
    </Form>
  );
};

export default Profile;
