import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import AuthService from "../services/auth.service";

class UserOnlyRoute extends Component {
  render() {
    if (AuthService.getCurrentUser().roles.includes("ROLE_USER")) {
      return <Route {...this.props} />;
    } else {
      return <Redirect to="/unauthorized" />;
    }
  }
}
export default UserOnlyRoute;
