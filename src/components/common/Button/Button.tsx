import React from "react";
import buttonStyle from "./Button.module.css";

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  onClick,
  type,
  children,
  disabled,
}) => {
  return (
    <button
      className={buttonStyle.button}
      onClick={onClick}
      type={type || "button"}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
