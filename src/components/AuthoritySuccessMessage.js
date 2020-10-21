import React, { Component } from "react";
import { Helmet } from "react-helmet";

class AuthoritySuccessMessage extends Component {
  state = {
    profileMessage: "",
  };
  async getVitalData() {
    this.setState({
      profileMessage: "User Authority has been changed.",
    });
  }
  componentDidMount() {
    this.getVitalData();
  }
  render() {
    return (
      <div className="container">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <header className="jumbotron">
          <center>
            <h4>{this.state.profileMessage}</h4>
          </center>
        </header>
        <Helmet>
          <title>Authority Setting • Apollo Hospitals</title>
        </Helmet>
      </div>
    );
  }
}
export default AuthoritySuccessMessage;
