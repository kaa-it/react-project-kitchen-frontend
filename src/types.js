import PropTypes from "prop-types";

const userPropTypes = PropTypes.shape({
  email: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  image: PropTypes.string,
});

const errorPropTypes = PropTypes.shape({
  username: PropTypes.string,
  email: PropTypes.string,
  message: PropTypes.string,
})


export {
  userPropTypes,
  errorPropTypes
}
