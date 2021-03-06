import React from "react";
import inputStyle from "./Input.module.css";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element | null;
  onIconClick?: React.MouseEventHandler<HTMLSpanElement>;
  error?: boolean
}

const Input: React.FC<IInputProps> = ({
  name,
  onChange,
  type,
  placeholder,
  icon,
  onIconClick,
  onBlur,
  error,
   ...rest
}) => {
  return (
    <span className={inputStyle.inputWrap}>
      <input
      {...rest}
        className={`${inputStyle.input} ${error ? inputStyle.input__error : ''}`}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
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
