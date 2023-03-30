import React from "react";
import { IToggle } from "../types/IToggle";
import ToggleItem from "./ToggleItem";

interface ToggleListProps {
  toggles: IToggle[];
  updateToggleName: (id: number, newName: string) => void;
  switchToggle: (id: number) => void;
}

const ToggleList: React.FC<ToggleListProps> = ({
  toggles,
  updateToggleName,
  switchToggle,
}) => {
  return (
    <ul>
      {toggles.map((toggle) => (
        <ToggleItem
          key={toggle.id}
          toggle={toggle}
          updateToggleName={updateToggleName}
          switchToggle={switchToggle}
        />
      ))}
    </ul>
  );
};

export default ToggleList;
