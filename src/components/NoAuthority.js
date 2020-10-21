import React, { Component } from "react";
import { Helmet } from "react-helmet";

class NoAuthority extends Component {
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
            <h4>You have no Authority to access this page</h4>
          </center>
        </header>
        <Helmet>
          <title>No Authority • Apollo Hospitals</title>
        </Helmet>
      </div>
    );
  }
}
export default NoAuthority;
