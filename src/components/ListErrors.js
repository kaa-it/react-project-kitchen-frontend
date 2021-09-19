import React from 'react';
import { errorPropTypes } from '../types';

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
  errors: errorPropTypes
};

export default ListErrors;
