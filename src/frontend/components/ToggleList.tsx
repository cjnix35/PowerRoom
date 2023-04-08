import React, { useEffect, useRef, useState } from "react";
import { IToggle } from "../types/IToggle";
import ToggleItem from "./ToggleItem";
import Refresh from "./Refresh";
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
      const isScrolledToBottom =
        listRef.current.scrollHeight - listRef.current.scrollTop ===
        listRef.current.clientHeight;

      // Update the visibility state of ScrollIndicator based on whether the user has reached the bottom of the list
      setShowScrollIndicator(!isScrolledToBottom);
    }
  };

  // useEffect to reset the visibility of the ScrollIndicator when the toggles list changes
  useEffect(() => {
    setShowScrollIndicator(true);
  }, [toggles]);

  return (
    <>
      <ul
        className="hide-scrollbar flex flex-col gap-8 scroll-smooth"
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
      <ScrollIndicator isVisible={showScrollIndicator} />
      <Refresh />
    </>
  );
};

export default ToggleList;
