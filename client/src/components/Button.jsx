import PropTypes from 'prop-types';
import React from 'react';

const Button = ({ type, text, title, onClick, className, value, disabled, styleType }) => {
  styleType = styleType || 'default';
  const btnColor = {
    default: 'tm-btn',
    primary: 'tm-btn-primary',
    warning: 'tm-btn-warning',
    danger: 'tm-btn-warning',
    transparent: 'tm-btn-transparent',
  }
  return (
    <button
      value={value}
      type={type || 'button'}
      title={title || text}
      onClick={onClick}
      disabled={disabled ? 'disabled' : ''}
      className={`flex justify-center rounded-md ${btnColor[styleType]} tm-btn-disabled ${className}`}
      >
      {text || title}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  // color: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.any,
  disabled: PropTypes.bool,
};

export default Button;
