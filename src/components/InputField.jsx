import React from "react";
import "../styles/Form.css";

const InputField = ({
  iconSrc,
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
}) => (
  <div className="input">
    <img src={iconSrc} alt={`${name} icon`} />
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={error ? "input-error" : ""}
    />
    {error && <small className="error-text">{error}</small>}
  </div>
);

export default InputField;
