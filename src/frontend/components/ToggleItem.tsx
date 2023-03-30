import React from "react";
import { IToggle } from "../types/IToggle";

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
    <li>
      <input
        type="text"
        value={toggle.name}
        onChange={(e) => updateToggleName(toggle.id, e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={toggle.isOn}
          onChange={() => switchToggle(toggle.id)}
        />
        {toggle.isOn ? "On" : "Off"}
      </label>
    </li>
  );
};

export default ToggleItem;
