// ~/app/character-map/[screenplayId]/generate/@characterMap/page.tsx
'use client'

import { charactermapform as CharacterMapForm } from "~/shadcn-components/component/CharacterMapForm";
import { useCharacterContext } from '../CharacterContext';

export default function CharacterMapPage() {
  const { characterData, updateCharacterData } = useCharacterContext();

  const handleChange = (newData: any) => {
    updateCharacterData('characterMap', newData);
  };

  return <CharacterMapForm data={characterData.characterMap} onChange={handleChange} />;
}
