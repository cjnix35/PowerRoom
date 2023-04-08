import React from "react";
import { IToggle } from "../types/IToggle";
import ToggleItem from "./ToggleItem";
import Refresh from "./Refresh";

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
    <>
      <ul className="flex flex-col gap-8 overflow-scroll">
        {toggles.map((toggle) => (
          <ToggleItem
            key={toggle.id}
            toggle={toggle}
            updateToggleName={updateToggleName}
            switchToggle={switchToggle}
          />
        ))}
      </ul>
      <Refresh />
    </>
  );
};

export default ToggleList;
