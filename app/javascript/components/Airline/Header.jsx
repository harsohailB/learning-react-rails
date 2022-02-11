import React from "react";
import styled from "styled-components";

const Header = (props) => {
  const { name, image_url, avg_score } = props.attributes;
  const total = props.reviews.length;

  const TotalReviews = styled.div`
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  `;

  const TotalOutof = styled.div`
    font-size: 18px;
    padding: 10px 0;
  `;

  return (
    <div>
      <h1>
        <img src={image_url} />
        {name}
      </h1>
      <div>
        <TotalReviews>{total} user reviews</TotalReviews>
        <div></div>
        <TotalOutof>{avg_score} out of 5</TotalOutof>
      </div>
    </div>
  );
};

export default Header;
