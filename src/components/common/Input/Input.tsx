import React from "react";
import inputStyle from "./Input.module.css";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element | null;
  onIconClick?: React.MouseEventHandler<HTMLSpanElement>;
}

const Input: React.FC<IInputProps> = ({
  name,
  onChange,
  type,
  placeholder,
  icon,
  onIconClick,
}) => {
  return (
    <span className={inputStyle.inputWrap}>
      <input
        className={inputStyle.input}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
      {icon && (
        <span className={inputStyle.icon} onClick={onIconClick}>
          {icon}
        </span>
      )}
    </span>
  );
};

export default Input;
