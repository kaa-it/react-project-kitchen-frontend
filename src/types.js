import PropTypes from "prop-types";

const userPropTypes = PropTypes.shape({
  email: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
});

const errorPropTypes = {
  errors: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    message: PropTypes.string,
  })
}

export {
  userPropTypes,
  errorPropTypes
}