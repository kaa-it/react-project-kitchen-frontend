import React from 'react';
import textareaStyle from './Textarea.module.css';

interface IInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  icon?: JSX.Element | null;
  onIconClick?: React.MouseEventHandler<HTMLSpanElement>;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical' | 'inherit';
}

const Textarea: React.FC<IInputProps> = ({
  name,
  onChange,
  placeholder,
  rows,
  icon,
  onIconClick,
  resize,
}) => {
  return (
    <span className={textareaStyle.textareaWrap}>
      <textarea
        style={{ resize: resize }}
        className={textareaStyle.textarea}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        rows={rows}
      />
      {icon && (
        <span className={textareaStyle.icon} onClick={onIconClick}>
          {icon}
        </span>
      )}
    </span>
  );
};

export default Textarea;
