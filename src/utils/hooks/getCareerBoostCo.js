import { useState, useEffect } from 'react';
import { supabase } from '../utils/hooks/supabase';

export const getCareerBoostCo = () => {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.from('company_profiles').select('*');
        if (error) throw error;
        setCompanies(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return { companies, isLoading, error };
};
