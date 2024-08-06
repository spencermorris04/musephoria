// ~/shadcn-components/component/PerspectivesForm.tsx
import React from 'react';
import { Label } from "~/shadcn-components/ui/label";
import { Input } from "~/shadcn-components/ui/input";
import { Textarea } from "~/shadcn-components/ui/textarea";

export function PerspectivesForm({ data = {}, onChange }: { data?: any, onChange: (data: any) => void }) {
  const handleChange = (field: string, value: string, index?: number) => {
    if (index !== undefined) {
      const newCharacters = [...(data.characters || [])];
      newCharacters[index] = { ...newCharacters[index], [field]: value };
      onChange({ ...data, characters: newCharacters });
    } else {
      onChange({ ...data, [field]: value });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-600">PERSPECTIVES</h1>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="space-y-4">
            <h2 className="text-xl font-bold text-blue-600">CHARACTER {index + 1}</h2>
            <div className="space-y-2">
              <Label htmlFor={`character-name-${index}`} className="text-sm font-semibold text-blue-600">
                CHARACTER NAME
              </Label>
              <Input
                id={`character-name-${index}`}
                value={data?.characters?.[index]?.name || ''}
                onChange={(e) => handleChange('name', e.target.value, index)}
                placeholder="Enter character name"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`coping-strategy-${index}`} className="text-sm font-semibold text-blue-600">
                COPING STRATEGY
              </Label>
              <Textarea
                id={`coping-strategy-${index}`}
                value={data?.characters?.[index]?.copingStrategy || ''}
                onChange={(e) => handleChange('copingStrategy', e.target.value, index)}
                placeholder="Describe coping strategy"
                className="h-24"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`relationship-${index}`} className="text-sm font-semibold text-blue-600">
                RELATIONSHIP TO MAIN CHARACTER
              </Label>
              <Textarea
                id={`relationship-${index}`}
                value={data?.characters?.[index]?.relationship || ''}
                onChange={(e) => handleChange('relationship', e.target.value, index)}
                placeholder="Describe relationship"
                className="h-24"
              />
            </div>
          </div>
        ))}
        <div className="space-y-4 col-span-2">
          <h2 className="text-xl font-bold text-blue-600">SHARED GENERAL NEGATIVE EXPERIENCE</h2>
          <Textarea
            value={data?.sharedNegativeExperience || ''}
            onChange={(e) => handleChange('sharedNegativeExperience', e.target.value)}
            placeholder="Describe shared negative experience"
            className="h-32"
          />
        </div>
      </div>
    </div>
  );
}