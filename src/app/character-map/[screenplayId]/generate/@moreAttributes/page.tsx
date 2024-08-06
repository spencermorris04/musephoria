// ~/app/character-map/[screenplayId]/generate/@moreAttributes/page.tsx
'use client'

import { MoreCharacterAttributesForm } from "~/shadcn-components/component/MoreCharacterAttributesForm";
import { useCharacterContext } from '../CharacterContext';

export default function MoreAttributesPage() {
  const { characterData, updateCharacterData } = useCharacterContext();

  const handleChange = (newData: any) => {
    updateCharacterData('moreAttributes', newData);
  };

  return <MoreCharacterAttributesForm data={characterData.moreAttributes} onChange={handleChange} />;
}
