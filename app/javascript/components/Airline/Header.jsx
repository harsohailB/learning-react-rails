import React from "react";

const Header = (props) => {
  const { name, image_url, avg_score } = props.attributes;
  const total = props.reviews.length;

  return (
    <div>
      <h1>
        <img src={image_url} />
        {name}
      </h1>
      <div>
        <div>{total} user reviews</div>
        <div></div>
        <div>{avg_score} out of 5</div>
      </div>
    </div>
  );
};

export default Header;
