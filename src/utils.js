const getColorByType = (type) => {
  if (type === "primary") {
    return "#F2F2F3";
  } else if (type === "secondary") {
    return "#8585AD";
  }
};

export { getColorByType };
