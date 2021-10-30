const getColorByType = (type: "primary" | "secondary") => {
  if (type === "primary") {
    return "#F2F2F3";
  } else {
    return "#8585AD";
  }
};

export { getColorByType };
