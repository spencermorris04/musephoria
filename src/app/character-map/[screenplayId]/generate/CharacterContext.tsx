// ~/app/character-map/[screenplayId]/generate/CharacterContext.tsx
'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

type CharacterData = {
  characterMap: Record<string, unknown>;
  characterArc: Record<string, unknown>;
  moreAttributes: Record<string, unknown>;
  perspectives: Record<string, unknown>;
};

type Character = {
  name: string;
};

type CharacterContextType = {
  characterData: CharacterData;
  updateCharacterData: (section: keyof CharacterData, data: Record<string, unknown>) => void;
  characters: Character[];
  selectedCharacter: string | null;
  setSelectedCharacter: (character: string | null) => void;
  generateCharacterSheet: () => Promise<void>;
  uploadCharacterSheet: () => Promise<void>;
};

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export function CharacterProvider({ children }: { children: React.ReactNode }) {
  const [characterData, setCharacterData] = useState<CharacterData>({
    characterMap: {},
    characterArc: {},
    moreAttributes: {},
    perspectives: {},
  });
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);

  const params = useParams();
  const screenplayId = params.screenplayId as string;

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await fetch(`/api/screenplay/${screenplayId}/characters`);
      if (response.ok) {
        const data: Character[] = await response.json();
        setCharacters(data);
      }
    };
    fetchCharacters();
  }, [screenplayId]);

  const updateCharacterData = (section: keyof CharacterData, data: Record<string, unknown>) => {
    setCharacterData(prev => ({ ...prev, [section]: data }));
  };

  const generateCharacterSheet = async () => {
    if (!selectedCharacter) return;
    try {
      const response = await fetch(`/api/character-sheet/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ screenplayId, characterName: selectedCharacter }),
      });
      if (response.ok) {
        const result: CharacterData = await response.json();
        setCharacterData(result);
      } else {
        throw new Error('Failed to generate character sheet');
      }
    } catch (error) {
      console.error('Error generating character sheet:', error);
    }
  };

  const uploadCharacterSheet = async () => {
    if (!selectedCharacter) return;
    try {
      const response = await fetch(`/api/character-sheet/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ screenplayId, characterSheet: characterData }),
      });
      if (!response.ok) {
        throw new Error('Failed to upload character sheet');
      }
    } catch (error) {
      console.error('Error uploading character sheet:', error);
    }
  };

  return (
    <CharacterContext.Provider value={{
      characterData,
      updateCharacterData,
      characters,
      selectedCharacter,
      setSelectedCharacter,
      generateCharacterSheet,
      uploadCharacterSheet,
    }}>
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