import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import { useLocation } from "react-router";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
`;

const Column = styled.div`
  background: #fff;
  max-width: 50%;
  width: 50%;
  float: left;
  height: 100vh;
  overflow-x: scroll;
  overflow-y: scroll;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  &:last-child {
    background: black;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
  }
`;

const Main = styled.div`
  padding-left: 60px;
`;

const Airline = (props) => {
  const [airline, setAirline] = useState({});
  const [review, setReview] = useState({});
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoaded(false);
    const url = `/api/v1${location.pathname}`;

    axios
      .get(url)
      .then((response) => {
        setAirline(response.data);
        setLoaded(true);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Wrapper>
      <Column>
        <Main>
          {loaded && (
            <Header
              attributes={airline.data.attributes}
              reviews={airline.included}
            />
          )}
          <div></div>
        </Main>
      </Column>
      <Column>
        <div>Review form goes here</div>
      </Column>
    </Wrapper>
  );
};

export default Airline;
