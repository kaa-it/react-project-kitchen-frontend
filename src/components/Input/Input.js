import React from 'react';
import inputStyle from './Input.module.css';
import PropType from 'prop-types';
const Input = ({ name, onChange, type, placeholder, ref }) => {
    return (
        <input
            className={inputStyle.input}
            type={type}
            name={name}
            ref={ref}
            placeholder={placeholder}
            onChange={onChange} />
    )
}

Input.propType = {
    name: PropType.string.isRequired,
    onChange: PropType.func.isRequired,
    type: PropType.string.isRequired,
    ref: PropType.node.isRequired,
    placeholder: PropType.string.isRequired
}

export default Input;