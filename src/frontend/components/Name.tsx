import React from "react";

interface NameProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}
const Name: React.FC<NameProps> = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="h-full w-full text-ellipsis rounded-lg bg-transparent px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none"
    />
  );
};

export default Name;
