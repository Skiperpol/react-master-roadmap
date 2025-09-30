import React from "react";
import "./components.css";

type InputProps = {
  label?: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
};

const Input = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: InputProps) => {
  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <input
        className="input"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
