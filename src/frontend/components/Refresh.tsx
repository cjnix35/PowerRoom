import React, { useContext, useState } from "react";
import RefreshContext from "../RefreshContext";

interface RefreshProps {
  onBgAnimate: () => void;
}
const Refresh: React.FC<RefreshProps> = ({ onBgAnimate }) => {
  const fetchToggles = useContext(RefreshContext);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleClick = () => {
    // Fetch the toggles
    if (fetchToggles) {
      fetchToggles();
    }

    // Launch spinning animation
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
    }, 2000);

    // Launch background animation
    onBgAnimate();
  };
  return (
    <button
      onClick={handleClick}
      className="mt-10 flex h-16 w-16 items-center justify-center rounded-full border border-[rgba(196,126,252,0.7)] bg-white bg-opacity-25 shadow-card backdrop-blur"
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${isSpinning ? "animate-loading" : ""}`}
      >
        <g opacity="0.7">
          <path
            d="M29.2516 10.1032C26.7305 7.74258 23.4587 6.44855 19.9877 6.45161C13.7411 6.4571 8.34839 10.7402 6.85944 16.6815C6.75105 17.114 6.36573 17.4194 5.91984 17.4194H1.29863C0.693952 17.4194 0.234597 16.8704 0.346452 16.2761C2.09137 7.01 10.2269 0 20 0C25.3587 0 30.2251 2.10774 33.8157 5.53911L36.696 2.65887C37.9152 1.4396 40 2.30315 40 4.0275V14.8387C40 15.9077 39.1335 16.7742 38.0645 16.7742H27.2533C25.529 16.7742 24.6654 14.6894 25.8847 13.4701L29.2516 10.1032ZM1.93548 23.2258H12.7467C14.471 23.2258 15.3346 25.3106 14.1153 26.5299L10.7484 29.8969C13.2695 32.2576 16.5415 33.5516 20.0126 33.5485C26.256 33.5428 31.6509 29.2627 33.1406 23.3187C33.249 22.8862 33.6343 22.5808 34.0802 22.5808H38.7015C39.3061 22.5808 39.7655 23.1298 39.6536 23.724C37.9086 32.99 29.7731 40 20 40C14.6413 40 9.77492 37.8923 6.18427 34.4609L3.30403 37.3411C2.08476 38.5604 0 37.6969 0 35.9725V25.1613C0 24.0923 0.866532 23.2258 1.93548 23.2258Z"
            fill="rgba(255,255,255,0.8)"
          />
        </g>
      </svg>
    </button>
  );
};

export default Refresh;
