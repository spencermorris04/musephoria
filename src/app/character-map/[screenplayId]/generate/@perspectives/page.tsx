// ~/app/character-map/[screenplayId]/generate/@perspectives/page.tsx
'use client'

import { PerspectivesForm } from "~/shadcn-components/component/PerspectivesForm";
import { useCharacterContext } from '../CharacterContext';

export default function PerspectivesPage() {
  const { characterData, updateCharacterData } = useCharacterContext();

  const handleChange = (newData: Record<string, unknown>) => {
    updateCharacterData('perspectives', newData);
  };

  return <PerspectivesForm data={characterData.perspectives} onChange={handleChange} />;
}