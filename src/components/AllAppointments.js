import React, { Component } from "react";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Helmet } from "react-helmet";

export default class AllAppointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
    };
  }
  async getUsersData() {
    let arr = [];
    const res = await axios.get("http://localhost:8004/book/appointment");
    this.setState({ loading: false, users: res.data });
  }
  componentDidMount() {
    this.getUsersData();
  }
  render() {
    const onRowClick = (state, rowInfo) => {
      return {
        onClick: (e) => {
          window.open("/appointmentHistory/" + rowInfo.original.booking_id);
        },
      };
    };
    const columns = [
      {
        Header: "Booking ID",
        accessor: "booking_id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Phone Number",
        accessor: "phnNumber",
      },
      {
        Header: "Doctor",
        accessor: "docType",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Time Slot",
        accessor: "timeSlot",
      },
      {
        Header: "Status",
        accessor: "status",
      },
    ];
    return (
      <div>
        <Helmet>
          <title>All Appointments • Apollo Hospitals</title>
        </Helmet>
        <br></br>
        <br></br>
        <center>
          <h2>All Appointments</h2>
        </center>
        <br></br>
        <br></br>
        <ReactTable
          filterable={true}
          defaultPageSize={10}
          data={this.state.users}
          columns={columns}
          getTrProps={onRowClick}
        />
      </div>
    );
  }
}
