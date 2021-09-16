import React from 'react';
import PropTypes from 'prop-types';

const ListErrors = ({errors}) => {
  const errorsObj = errors;
  if (errorsObj) {
    return (
        <ul className="error-messages">
          {
            Object.keys(errorsObj).map(key => {
              return (
                  <li key={key}>
                    {key} {errorsObj[key]}
                  </li>
              );
            })
          }
        </ul>
    );
  } else {
    return null;
  }
}

ListErrors.propTypes = {
  errors: PropTypes.object.isRequired
}

export default ListErrors;
