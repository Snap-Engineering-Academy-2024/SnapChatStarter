import { useState } from 'react';

export const useRaceSelection = (initialRaces, ethnicities) => {
  const [selectedRaces, setSelectedRaces] = useState(initialRaces);

  const raceSelection = (label) => {
    if (label === "All Inclusive") {
      setSelectedRaces(["All Inclusive"]);
    } else {
      setSelectedRaces((prevSelectedRaces) => {
        const isAlreadySelected = prevSelectedRaces.includes(label);
        let updatedSelections;

        if (isAlreadySelected) {
          updatedSelections = prevSelectedRaces.filter(
            (race) => race !== label
          );
        } else {
          updatedSelections = prevSelectedRaces
            .filter((race) => race !== "All Inclusive")
            .concat(label);
        }

        if (updatedSelections.length === ethnicities.length - 1) {
          return ["All Inclusive"];
        }

        return updatedSelections.length === 0
          ? ["All Inclusive"]
          : updatedSelections;
      });
    }
  };

  return {
    selectedRaces,
    raceSelection,
  };
};
