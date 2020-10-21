import React from "react";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div className="container">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <header className="jumbotron">
        <center>
          <h2>Welcome to Apollo Hospitals</h2>
        </center>
      </header>
      <Helmet>
        <title>Home • Apollo Hospitals</title>
      </Helmet>
    </div>
  );
};

export default Home;
