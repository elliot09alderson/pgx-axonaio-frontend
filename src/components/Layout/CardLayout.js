import React from "react";
import styled from "styled-components";

const Card = ({ title, content, rupees }) => {
  return (
    <div className="w-64 p-4 flex flex-col rounded-xl cursor-pointer third-bg gap-4 items-center justify-center ">
      <h1 className="text-3xl font-bold text-center m-0 p-0  first-text">
        {title}
      </h1>
      <p className="text-lg font-bold first-text m-0 p-0">{rupees}</p>
      <p className="text-lg font-semibold first-text m-0 p-0">{content}</p>
    </div>
  );
};

export default Card;
