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
      className="h-full w-full truncate rounded-lg bg-transparent py-4 px-4 text-gray-900 placeholder-gray-600 focus:outline-none sm:text-base md:text-xl xl:text-2xl"
    />
  );
};

export default Name;
