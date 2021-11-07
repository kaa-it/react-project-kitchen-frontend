import {PRIMARY_COLOR, SECONDARY_COLOR, WARNING_COLOR} from "./constants/constants";

const getColorByType = (type: "primary" | "secondary" | "warning") => {
  if (type === "primary") {
    return PRIMARY_COLOR;
  } else if (type === "secondary") {
    return SECONDARY_COLOR;
  } else {
    return WARNING_COLOR;
  }
};

export { getColorByType };
