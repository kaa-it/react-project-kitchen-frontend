import React from "react";
import { getColorByType } from "../utils";
import PropTypes from "prop-types";

const PlusIcon = ({ type }) => {
  const color = getColorByType(type);

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 5V19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 12H19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

PlusIcon.propTypes = {
  type: PropTypes.string.isRequired,
};

export default PlusIcon;
