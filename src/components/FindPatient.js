import React, { Component } from "react";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Helmet } from "react-helmet";

export default class FindPatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
    };
  }
  async getUsersData() {
    const res = await axios.get("http://localhost:8003/patients/patient");
    this.setState({ loading: false, users: res.data });
  }
  componentDidMount() {
    this.getUsersData();
  }
  render() {
    const columns = [
      {
        Header: "Name",
        accessor: "name",
      },

      {
        Header: "Date of Birth",
        accessor: "dob",
      },
      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "Sex",
        accessor: "sex",
      },
      {
        Header: "Blood Group",
        accessor: "bloodGroup",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Phone Number",
        accessor: "phnNumber",
      },
      {
        Header: "Address",
        accessor: "address",
      },
    ];
    return (
      <div>
        <Helmet>
          <title>Search Patient • Apollo Hospitals</title>
        </Helmet>
        <br></br>
        <br></br>
        <center>
          <h2>Patient Portal</h2>
        </center>
        <br></br>
        <br></br>
        <ReactTable
          onclick={this.registerValuesHandler}
          filterable={true}
          defaultPageSize={10}
          data={this.state.users}
          columns={columns}
        />
      </div>
    );
  }
}
