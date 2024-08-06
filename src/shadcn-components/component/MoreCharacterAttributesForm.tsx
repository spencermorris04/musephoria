// ~/shadcn-components/component/MoreCharacterAttributesForm.tsx
import React from 'react';
import { Label } from "~/shadcn-components/ui/label";
import { Input } from "~/shadcn-components/ui/input";
import { Textarea } from "~/shadcn-components/ui/textarea";

export function MoreCharacterAttributesForm({ data = {}, onChange }: { data?: any, onChange: (data: any) => void }) {
  const handleChange = (field: string, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-600">MORE CHARACTER ATTRIBUTES</h1>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="mood" className="text-lg font-semibold text-blue-600">
            MOOD/TEMPERAMENT
          </Label>
          <Textarea 
            id="mood" 
            value={data?.mood || ''} 
            onChange={(e) => handleChange('mood', e.target.value)} 
            placeholder="Enter mood or temperament" 
            className="h-32" 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hobbies" className="text-lg font-semibold text-blue-600">
            HOBBIES
          </Label>
          <Textarea 
            id="hobbies" 
            value={data?.hobbies || ''} 
            onChange={(e) => handleChange('hobbies', e.target.value)} 
            placeholder="Enter hobbies" 
            className="h-32" 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="skills" className="text-lg font-semibold text-blue-600">
            SKILLS
          </Label>
          <Textarea 
            id="skills" 
            value={data?.skills || ''} 
            onChange={(e) => handleChange('skills', e.target.value)} 
            placeholder="Enter skills" 
            className="h-32" 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="habits" className="text-lg font-semibold text-blue-600">
            HABITS/ADDICTIONS
          </Label>
          <Textarea 
            id="habits" 
            value={data?.habits || ''} 
            onChange={(e) => handleChange('habits', e.target.value)} 
            placeholder="Enter habits or addictions" 
            className="h-32" 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tastes" className="text-lg font-semibold text-blue-600">
            TASTES/PREFERENCES
          </Label>
          <Textarea 
            id="tastes" 
            value={data?.tastes || ''} 
            onChange={(e) => handleChange('tastes', e.target.value)} 
            placeholder="Enter tastes or preferences" 
            className="h-32" 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="weaknesses" className="text-lg font-semibold text-blue-600">
            WEAKNESSES
          </Label>
          <Textarea 
            id="weaknesses" 
            value={data?.weaknesses || ''} 
            onChange={(e) => handleChange('weaknesses', e.target.value)} 
            placeholder="How could someone trick or manipulate this character?" 
            className="h-32" 
          />
        </div>
      </div>
      <div className="space-y-4">
        <Label htmlFor="extra-info" className="text-lg font-semibold text-blue-600">
          EXTRA INFORMATION
        </Label>
        <Textarea 
          id="extra-info" 
          value={data?.extraInfo || ''} 
          onChange={(e) => handleChange('extraInfo', e.target.value)} 
          placeholder="Additional character details" 
          className="h-32" 
        />
      </div>
    </div>
  );
}