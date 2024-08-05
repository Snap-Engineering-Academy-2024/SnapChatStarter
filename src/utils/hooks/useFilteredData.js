import { useMemo } from 'react';

export const useFilteredData = (companyData, selectedRaces) => {
  const filteredData = useMemo(() => {
    return companyData.filter((company) => {
      return selectedRaces.some(race => {
        if (race === "All Inclusive") return true;
        return company.communities.includes(race);
      });
    });
  }, [companyData, selectedRaces]);

  return filteredData;
};
