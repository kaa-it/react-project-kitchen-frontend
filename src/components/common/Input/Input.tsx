import React from "react";
import inputStyle from "./Input.module.css";

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  name,
  onChange,
  type,
  placeholder,
}) => {
  return (
    <input
      className={inputStyle.input}
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
