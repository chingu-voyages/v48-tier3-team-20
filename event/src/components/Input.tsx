import React from "react";

interface InputProps {
  type: string;
  name: string;
  required: boolean;
  id: string;
}

const Input = ({ type, name, required, id }: InputProps) => {
  return (
      <div>
        <label htmlFor={id} className="mb-1 block text-gray-200">
          {name}
        </label>
        <input
          type={type}
          name={name}
          id={id}
          className="w-full rounded-md bg-gray-700 px-3 py-2 text-gray-200 focus:outline-none focus:ring focus:ring-blue-500"
          required={required}
        />
      </div>
  );
};

export default Input;