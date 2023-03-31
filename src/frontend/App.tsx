import React, { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { IToggle } from "./types/IToggle";
import ToggleList from "./components/ToggleList";
const App = () => {
  const [toggles, setToggles] = useLocalStorage<IToggle[]>("toggles", []);

  // Import environment variables
  const IP = import.meta.env.VITE_IP;
  const SEC_KEY = import.meta.env.VITE_SECKEY;

  useEffect(() => {
    const fetchToggles = async () => {
      const response = await fetch(`${IP}/getCurrentState`);
      const data = await response.json();

      // Toggles from server comes without names , so we initialize the names
      const togglesWithNames: IToggle[] = data.map((fetchedToggle: IToggle) => {
        // Find corresponding toggle in local storage
        const storedToggle = toggles.find(
          (toggle) => toggle.id === fetchedToggle.id
        );

        // If the storedToggle exists, use the fetchedToggle (updated state) and add the stored name
        // Otherwise, use the fetchedToggle and set name to an empty string
        return storedToggle
          ? {
              ...fetchedToggle,
              name: storedToggle.name,
            }
          : {
              ...fetchedToggle,
              name: "",
            };
      });

      setToggles(togglesWithNames);
    };

    fetchToggles();
  }, []);

  const updateToggleName = (id: number, newName: string) => {
    const updatedToggles = toggles.map((toggle) =>
      toggle.id === id ? { ...toggle, name: newName } : toggle
    );
    setToggles(updatedToggles);
  };

  const switchToggle = async (id: number) => {
    const response = await fetch(
      `${String(import.meta.env.VITE_IP)}/switchToggle`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          secKey: SEC_KEY,
        }),
      }
    );
    const data = await response.json();

    // Check if switching was successful
    if (data.result) {
      const updatedToggles = toggles.map(
        (toggle) =>
          toggle.id === id ? { ...toggle, isOn: !toggle.isOn } : toggle // toggle the switch
      );
      setToggles(updatedToggles);
    } else {
      setToggles(toggles);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center text-center h-screen">
      <h1>Toggle List</h1>
      <ToggleList
        toggles={toggles}
        updateToggleName={updateToggleName}
        switchToggle={switchToggle}
      />
    </div>
  );
};

export default App;
