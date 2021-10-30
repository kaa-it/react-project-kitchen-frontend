import React from "react";
import { TErrors } from "../types";

interface IListErrorsProps {
  errors: TErrors | null;
}

const ListErrors: React.FC<IListErrorsProps> = ({ errors }) => {
  console.log(errors);

  if (errors) {
    return (
      <ul className="error-messages">
        {Object.keys(errors).map((key) => {
          if (typeof errors[key] !== "object") {
            return (
              <li key={key}>
                {key}: {errors[key]}
              </li>
            );
          }
          return null;
        })}
      </ul>
    );
  } else {
    return null;
  }
};

export default ListErrors;
