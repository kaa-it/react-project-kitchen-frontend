import PropTypes from "prop-types";

export type TUser = {
  username: string;
  email: string;
  token: string;
  bio: string;
  image: string;
};

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
});

export { userPropTypes, errorPropTypes };
