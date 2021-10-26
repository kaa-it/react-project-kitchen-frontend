const getColorByType = (type) => {
  if (type === "primary") {
    return "#F2F2F3";
  } else if (type === "secondary") {
    return "#8585AD";
  } else {
    return "#F2F2F3";
  }
};

const API_ROOT = "http://akruglov.ru:3000/api";

export { getColorByType, API_ROOT };
