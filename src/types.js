import PropTypes from "prop-types";

export const userPropTypes = PropTypes.shape({
  email: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
});
