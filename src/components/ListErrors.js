import React from 'react';
import PropTypes from 'prop-types';

const ListErrors = ({ errors }) => {
  const errorsObj = errors;
  console.log(errors);
  if (errorsObj) {
    return (
      <ul className="error-messages">
        {
          Object.keys(errorsObj).map(key => {
            if (typeof errorsObj[key] !== 'object') {
              return (
                <li key={key}>
                  {key}: {errorsObj[key]}
                </li>
              );
            }
            return null;
          })
        }
      </ul>
    );
  } else {
    return null;
  }
}

ListErrors.propTypes = {
  errors: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    message: PropTypes.string,
  })
}

export default ListErrors;
