import React, { Component } from "react";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Helmet } from "react-helmet";

export default class CrudLogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true,
    };
  }
  async getLogsFromDynamoDB() {
    const res = await axios.get("http://localhost:8002/vital/logs");
    this.setState({ loading: false, logs: res.data });
  }
  componentDidMount() {
    this.getLogsFromDynamoDB();
  }
  render() {
    const columns = [
      {
        Header: "Log ID",
        accessor: "logId",
      },
      {
        Header: "Date Time",
        accessor: "dateTime",
      },
      {
        Header: "Method Name",
        accessor: "methodName",
      },
      {
        Header: "Class Name",
        accessor: "className",
      },
      {
        Header: "Log Statement",
        accessor: "logStatement",
      },
    ];
    return (
      <div>
        <Helmet>
          <title>CRUD Logs • Apollo Hospitals</title>
        </Helmet>
        <br></br>
        <br></br>
        <center>
          <h2>CRUD Logs</h2>
        </center>
        <br></br>
        <br></br>
        <ReactTable
          onclick={this.registerValuesHandler}
          filterable={true}
          defaultPageSize={10}
          data={this.state.logs}
          columns={columns}
        />
      </div>
    );
  }
}
