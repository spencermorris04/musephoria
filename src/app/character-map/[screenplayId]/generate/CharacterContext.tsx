// ~/app/character-map/[screenplayId]/generate/CharacterContext.tsx
"use client";

import React, { createContext, useContext, useState } from 'react';

type CharacterData = {
  characterMap: any;
  moreAttributes: any;
  characterArc: any;
  perspectives: any;
};

type CharacterContextType = {
  characterData: CharacterData;
  updateCharacterData: (section: keyof CharacterData, data: any) => void;
};

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export function CharacterProvider({ children }: { children: React.ReactNode }) {
  const [characterData, setCharacterData] = useState<CharacterData>({
    characterMap: {},
    moreAttributes: {},
    characterArc: {},
    perspectives: {},
  });

  const updateCharacterData = (section: keyof CharacterData, data: any) => {
    setCharacterData(prev => ({ ...prev, [section]: { ...prev[section], ...data } }));
  };

  return (
    <CharacterContext.Provider value={{ characterData, updateCharacterData }}>
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacterContext() {
  const context = useContext(CharacterContext);
  if (context === undefined) {
    throw new Error('useCharacterContext must be used within a CharacterProvider');
  }
  return context;
}