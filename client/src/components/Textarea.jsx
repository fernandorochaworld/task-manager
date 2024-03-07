import PropTypes from 'prop-types';
import React, { useState } from 'react';

const Textarea = ({name, title, value, className, disabled, onChange}) => {
  
  const [, setVal] = useState(value || '');

  function handleChange(e) {
    setVal(e.target.value);
    if (onChange) onChange(e);
  }

  const myClass = `${className} block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`;
  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">{title}</label>
      <div className="mt-2">
        <textarea id={name} name={name} value={value} required className={myClass} disabled={(disabled)? 'disabled' : ''} onChange={handleChange} rows="5" />
      </div>
    </div>
  );
};

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.any,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Textarea;
