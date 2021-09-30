import React from 'react';
import buttonStyle from './Button.module.css';
import PropType from 'prop-types';

const Button = ({ onClick, type, children, disabled }) => {
    return (
        <button className={buttonStyle.button} onClick={onClick} type={type || "button"} disabled={disabled}>
            {children}
        </button>
    )
}

Button.propType = {
    onClick: PropType.func.isRequired,
    children: PropType.element.isRequired,
    type: PropType.string,
    disabled: PropType.bool,
}

export default Button;