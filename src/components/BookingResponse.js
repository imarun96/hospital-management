import React, { Component } from "react";
import { Helmet } from "react-helmet";

class BookingResponse extends Component {
  state = {
    profileMessage: "",
  };
  async getVitalData() {
    let urlElements = window.location.href.split("/");
    this.setState({
      profileMessage:
        "Your appointment has been confirmed. Please note your Token ID [" +
        urlElements[4] +
        "]",
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
          <title>Booking ID • Apollo Hospitals</title>
        </Helmet>
      </div>
    );
  }
}
export default BookingResponse;
