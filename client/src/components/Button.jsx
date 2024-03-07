import PropTypes from 'prop-types';
import React from 'react';

const Button = ({ type, title, onClick, className, value, disabled }) => {
  // const styleColor = color || 'sky';
  // const styleColor = 'sky';
  return (
    <button
      value={value}
      type={type || 'button'}
      onClick={onClick}
      disabled={disabled ? 'disabled' : ''}
      className={`${className} flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:bg-gray-200 disabled:text-gray-500 disabled:border-gray-800 disabled:shadow-none disabled:cursor-not-allowed`}>
      {title}
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
