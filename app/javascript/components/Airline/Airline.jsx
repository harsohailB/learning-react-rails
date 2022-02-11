import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import { useLocation } from "react-router";
import styled from "styled-components";
import ReviewForm from "./ReviewForm";

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
  const [error, setError] = useState("");
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

  const handleChange = (e) => {
    e.preventDefault();
    setReview(Object.assign({}, review, { [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const csrfToken = document.querySelector("[name=csrf-token]").content;
    axios.defaults.headers.common["X-CCSRF_TOKEN"] = csrfToken;

    const airline_id = airline.data.id;
    axios
      .post("/api/v1/reviews", { review, airline_id })
      .then((response) => {
        const included = [...airline.included, response.data];
        setAirline({ ...airline, included });
        setReview({ title: "", description: "", score: 0 });
      })
      .catch(() => {
        let error;
        switch (resp.message) {
          case "Request failed with status code 401":
            error = "Please log in to leave a review.";
            break;
          default:
            error = "Something went wrong.";
        }
        setError(error);
      });
  };

  return (
    <Wrapper>
      {loaded && (
        <div>
          <Column>
            <Main>
              <Header
                attributes={airline.data.attributes}
                reviews={airline.included}
              />

              <div></div>
            </Main>
          </Column>
          <Column>
            <ReviewForm
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              attributes={airline.data.attributes}
              review={review}
              error={error}
            />
          </Column>
        </div>
      )}
    </Wrapper>
  );
};

export default Airline;
