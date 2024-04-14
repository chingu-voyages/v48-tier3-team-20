import React from "react";
import { toTitleCase } from "@/lib/utils";

interface InputProps {
  type?: string;
  name: string;
  text?: string;
  required?: boolean;
  id: string;
  value?: any;
  onChange?: (e: any) => void;
}

const Input = ({
  type = "text",
  name,
  required = true,
  id,
  text = toTitleCase(name),
  value,
  onChange,
}: InputProps) => {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-gray-800">
        {text}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className="w-full rounded-md bg-gray-200 px-3 py-2 text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
        required={required}
      />
    </div>
  );
};

export default Input;
