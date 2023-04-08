import React from "react";

interface SwitchProps {
  checked: boolean;
  onChange: () => void;
}
const Switch: React.FC<SwitchProps> = ({ checked, onChange }) => {
  return (
    <button
      onClick={onChange}
      className={`${
        checked ? "bg-gradient-ON" : "bg-gradient-OFF"
      }  my-auto h-6 w-12 flex-shrink-0 cursor-pointer select-none rounded-full transition-colors  duration-200 ease-in-out`}
    >
      <span
        className={`${
          checked ? "translate-x-3" : "-translate-x-3"
        }  mt-0.5  inline-block h-5 w-5 transform rounded-full bg-gradient-switch  transition duration-200 `}
      ></span>
    </button>
  );
};

export default Switch;
