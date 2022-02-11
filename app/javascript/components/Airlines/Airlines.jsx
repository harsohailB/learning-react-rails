import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import Airline from "./Airline";

const Home = styled.div`
  text-align: center;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const Header = styled.div`
  padding: 100px 100px 10px 100px;

  h1 {
    font-size: 42px;
  }
`;

const Subheader = styled.div`
  font-weight: 300;
  font-size: 26px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
`;

const Airlines = () => {
  const [airlines, setAirlines] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/airlines")
      .then((response) => {
        setAirlines(response.data.data);
      })
      .catch((error) => console.log(error));
  }, [airlines.length]);

  const list = airlines.map((airline) => <Airline airline={airline} />);

  return (
    <Home>
      <Header>
        <h1>OpenFlights</h1>
        <Subheader>Honest, unbiased airline reviews.</Subheader>
      </Header>
      <Grid>{list}</Grid>
    </Home>
  );
};

export default Airlines;
