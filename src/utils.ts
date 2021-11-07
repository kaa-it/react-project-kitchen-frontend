const getColorByType = (type: "primary" | "alert" | "secondary") => {
  if (type === "primary") {
    return "#F2F2F3";
  } else if (type === 'alert') {
    return "#F20D33";
  } else {
    return "#8585AD";
  }
};

export { getColorByType };
