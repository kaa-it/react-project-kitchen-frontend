import React from "react";
import { getColorByType } from "../utils";
import { TIconWithTypeProps } from "../types";

const MinusIcon: React.FC<TIconWithTypeProps> = ({ type }) => {
  const color = getColorByType(type);

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 12H19"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MinusIcon;
