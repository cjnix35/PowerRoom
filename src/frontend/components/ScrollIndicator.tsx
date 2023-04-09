// ScrollIndicator.tsx
import React from "react";

interface ScrollIndicatorProps {
  isVisible: boolean;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ isVisible }) => {
  return (
    <>
      {
        <svg
          width={48}
          height={48}
          viewBox="0 0 20 20"
          className={`${
            isVisible ? "rotate-0" : "rotate-180"
          } transition-all duration-200 ease-in-out`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 6L10 16L19 6H1Z"
            fill="rgba(255,255,255,0.50)"
            stroke="rgba(196,126,252,0.7)"
            strokeWidth="1"
          />
        </svg>
      }
    </>
  );
};

export default ScrollIndicator;
