import React, { useEffect, useRef, useState } from "react";
import { IToggle } from "../types/IToggle";
import ToggleItem from "./ToggleItem";

import ScrollIndicator from "./ScrollIndicator";

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
  // State for controlling the visibility of ScrollIndicator
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const listRef = useRef<HTMLUListElement>(null);

  const handleScroll = () => {
    if (listRef.current) {
      // Calculate the difference between scrollHeight, scrollTop, and clientHeight
      const difference =
        listRef.current.scrollHeight -
        listRef.current.scrollTop -
        listRef.current.clientHeight;

      // Define an acceptable margin to consider as the bottom of the scroll
      const margin = 1;

      // Update the visibility state of ScrollIndicator based on whether the user has reached the bottom of the list
      setShowScrollIndicator(difference > margin);
    }
  };

  return (
    <>
      <ul
        className="hide-scrollbar flex h-3/4 flex-col gap-8 scroll-smooth rounded px-12  py-8  md:w-1/2 md:gap-11 xl:w-1/3 xl:gap-14"
        onScroll={handleScroll}
        ref={listRef}
      >
        {toggles.map((toggle) => (
          <ToggleItem
            key={toggle.id}
            toggle={toggle}
            updateToggleName={updateToggleName}
            switchToggle={switchToggle}
          />
        ))}
      </ul>

      <div className="flex flex-col items-center justify-center gap-4">
        <ScrollIndicator isVisible={showScrollIndicator} />
      </div>
    </>
  );
};

export default ToggleList;
