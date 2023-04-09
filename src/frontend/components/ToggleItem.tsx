import React from "react";
import { IToggle } from "../types/IToggle";
import Switch from "./Switch";
import Name from "./Name";

interface ToggleItemProps {
  toggle: IToggle;
  updateToggleName: (id: number, newName: string) => void;
  switchToggle: (id: number) => void;
}
const ToggleItem: React.FC<ToggleItemProps> = ({
  toggle,
  updateToggleName,
  switchToggle,
}) => {
  return (
    <li className=" flex h-16 w-full  items-center gap-4 rounded-full border border-[rgba(196,126,252,0.7)] bg-white bg-opacity-25 pr-8 shadow-card backdrop-blur">
      <div
        className={` h-full w-12 rounded-l-full transition-colors duration-200 ease-in-out ${
          toggle.isOn ? "bg-gradient-ON" : "bg-gradient-OFF"
        }`}
      ></div>
      <Name
        value={toggle.name}
        onChange={(e) => updateToggleName(toggle.id, e.target.value)}
        placeholder="Give it a name"
      />
      <Switch checked={toggle.isOn} onChange={() => switchToggle(toggle.id)} />
    </li>
  );
};

export default ToggleItem;
