import React, { createContext, useState, useContext } from 'react';
import type { Profile } from '../data/profiles';

type MatchesContextType = {
  matches: Profile[];
  addMatch: (p: Profile) => void;
};

const MatchesContext = createContext<MatchesContextType | undefined>(undefined);

export const MatchesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [matches, setMatches] = useState<Profile[]>([]);
  const addMatch = (p: Profile) =>
    setMatches((prev) => (prev.find((x) => x.id === p.id) ? prev : [p, ...prev]));
  return <MatchesContext.Provider value={{ matches, addMatch }}>{children}</MatchesContext.Provider>;
};

export const useMatches = () => {
  const ctx = useContext(MatchesContext);
  if (!ctx) throw new Error('useMatches must be used within MatchesProvider');
  return ctx;
};