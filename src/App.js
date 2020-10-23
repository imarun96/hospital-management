import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import AuthenticatedRoute from "./components/AuthenticatedRoute";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import NewPatientEntryHandler from "./components/NewPatientEntry";
import PatientProfile from "./components/PatientProfile";
import FindPatient from "./components/FindPatient";
import NoAuthority from "./components/NoAuthority";
import VitalCheckUp from "./components/VitalCheckUp";
import VitalProfile from "./components/VitalProfile";
import CrudLogs from "./components/CrudLogs";
import AdminOnlyRoute from "./components/AdminOnlyRoute";
import UserOnlyRoute from "./components/UserOnlyRoute";
import BookAppointment from "./components/BookAppointment";
import YourAppointments from "./components/YourAppointments";
import AllAppointments from "./components/AllAppointments";
import AuthoritySetting from "./components/AuthoritySetting";
import AuthoritySuccessMessage from "./components/AuthoritySuccessMessage";
import BookingProfile from "./components/BookingProfile";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_NURSE"));
      setShowAdminBoard(user.roles.includes("ROLE_DOCTOR"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <ReactNotification />
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/about"} className="navbar-brand">
          Apollo Hospitals
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/about"} className="nav-link">
              About
            </Link>
          </li>
          {showModeratorBoard && (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/newPatient"} className="nav-link">
                  + Patient
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/patients"} className="nav-link">
                  Search Patient
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/vitalSign"} className="nav-link">
                  Vital Sign Entry
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/allAppointments"} className="nav-link">
                  All Appointments
                </Link>
              </li>
            </div>
          )}

          {showAdminBoard && (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/newPatient"} className="nav-link">
                  + Patient
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/patients"} className="nav-link">
                  Search Patient
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/vitalSign"} className="nav-link">
                  Vital Sign Entry
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/logs"} className="nav-link">
                  CRUD Logs
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/authority-setting"} className="nav-link">
                  Authority Setting
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/allAppointments"} className="nav-link">
                  All Appointments
                </Link>
              </li>
            </div>
          )}

          {currentUser && (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/appointment"} className="nav-link">
                  Book Appointment
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/yourAppointments"} className="nav-link">
                  Your Appointments
                </Link>
              </li>
            </div>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                Log out
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Log In
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/about"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <AuthenticatedRoute
            path="/newPatient"
            exact
            component={NewPatientEntryHandler}
          />
          <AuthenticatedRoute
            path="/vitalSign"
            exact
            component={VitalCheckUp}
          />
          <AuthenticatedRoute
            path="/patientprofile/*"
            exact
            component={PatientProfile}
          />
          <AuthenticatedRoute
            path="/vitalprofile/*"
            exact
            component={VitalProfile}
          />
          <AdminOnlyRoute
            path="/logs"
            exact
            component={CrudLogs}
          ></AdminOnlyRoute>
          <AdminOnlyRoute
            path="/authority-setting"
            exact
            component={AuthoritySetting}
          ></AdminOnlyRoute>
          <AdminOnlyRoute
            path="/appointmentHistory/*"
            exact
            component={BookingProfile}
          ></AdminOnlyRoute>
          <Route
            path="/authorityMessage"
            exact
            component={AuthoritySuccessMessage}
          ></Route>
          <UserOnlyRoute
            path="/appointment"
            exact
            component={BookAppointment}
          ></UserOnlyRoute>
          <UserOnlyRoute
            path="/yourAppointments"
            exact
            component={YourAppointments}
          ></UserOnlyRoute>
          <AuthenticatedRoute
            path="/vitalprofile/*"
            exact
            component={VitalProfile}
          />
          <AuthenticatedRoute
            path="/allAppointments"
            exact
            component={AllAppointments}
          />
          <AuthenticatedRoute path="/patients/" exact component={FindPatient} />
          <Route exact path="/unauthorized/" component={NoAuthority} />
        </Switch>
      </div>
    </div>
  );
};
export default App;
