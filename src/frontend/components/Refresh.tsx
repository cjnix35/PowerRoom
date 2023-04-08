import React, { useContext } from "react";
import RefreshContext from "../RefreshContext";

const Refresh = () => {
  const fetchToggles = useContext(RefreshContext);

  const handleClick = () => {
    if (fetchToggles) {
      fetchToggles();
    }
  };
  return (
    <button onClick={handleClick}>
      <span>refresh</span>
    </button>
  );
};

export default Refresh;
