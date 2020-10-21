import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import AuthService from "../services/auth.service";

class AdminOnlyRoute extends Component {
  render() {
    if (AuthService.getCurrentUser().roles.includes("ROLE_DOCTOR")) {
      return <Route {...this.props} />;
    } else {
      return <Redirect to="/unauthorized" />;
    }
  }
}
export default AdminOnlyRoute;
