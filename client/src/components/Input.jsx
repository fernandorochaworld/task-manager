import PropTypes from 'prop-types';
import React, { useState } from 'react';

const Input = ({type, name, title, value, placeholder, className, disabled, onChange, error}) => {
  
  const [, setVal] = useState(value || '');

  function handleChange(e) {
    setVal(e.target.value);
    if (onChange) onChange(e);
  }

  const myClass = `${className} h-9 block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`;
  return (
      <div className="w-full">
        <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">{title}</label>
        <div className="mt-2">
          <input id={name} name={name} type={type} placeholder={placeholder || title} value={value} required className={myClass} disabled={(disabled)? 'disabled' : ''} onChange={handleChange} />
        </div>
        {
          error &&
          <div className="w-full text-sm text-red-500">
            {error}
          </div>
        }
      </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Input;
