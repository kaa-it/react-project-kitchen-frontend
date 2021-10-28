const getColorByType = (type: string) => {
  if (type === "primary") {
    return "#F2F2F3";
  } else if (type === "secondary") {
    return "#8585AD";
  } else {
    return "#F2F2F3";
  }
};

export { getColorByType };
