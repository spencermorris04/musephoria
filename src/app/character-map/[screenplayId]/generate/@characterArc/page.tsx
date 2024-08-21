// ~/app/character-map/[screenplayId]/generate/@characterArc/page.tsx
'use client'
import { CharacterArcForm } from "~/shadcn-components/component/CharacterArcForm"
import { useCharacterContext } from '../CharacterContext'

export default function CharacterArcPage() {
  const { characterData, updateCharacterData } = useCharacterContext();

  const handleChange = (newData: Record<string, unknown>) => {
    updateCharacterData('characterArc', newData);
  };

  return <CharacterArcForm data={characterData.characterArc} onChange={handleChange} />
}