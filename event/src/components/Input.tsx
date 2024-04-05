import React from "react";

interface InputProps {
  htmlFor: string;
  className: string;
  type: string;
  name: string;
  required: boolean;
  labelClassName: string;
  labelName: string;
  id: string;
}

const Input = ({
  htmlFor,
  className,
  type,
  name,
  required,
  labelClassName,
  labelName,
  id,
}: InputProps) => {
  return (
    <div>
      <label htmlFor={htmlFor} className={labelClassName}>
        { labelName}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className={className}
        required={required}
      />
    </div>
  );
};

export default Input;
