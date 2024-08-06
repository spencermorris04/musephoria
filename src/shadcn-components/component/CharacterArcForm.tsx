// ~/shadcn-components/component/CharacterArcForm.tsx
import React from 'react';
import { Label } from "~/shadcn-components/ui/label";
import { Input } from "~/shadcn-components/ui/input";
import { Textarea } from "~/shadcn-components/ui/textarea";

export function CharacterArcForm({ data = {}, onChange }: { data?: any, onChange: (data: any) => void }) {
  const handleChange = (field: string, value: string | boolean) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-600">CHARACTER ARC</h1>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-blue-600">AT FIRST...</h2>
          <p className="text-sm italic">What reinforces the core urge?</p>
          <Textarea 
            value={data?.atFirst || ''} 
            onChange={(e) => handleChange('atFirst', e.target.value)} 
            placeholder="Write here..." 
            className="h-32" 
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-blue-600">LATER ON...</h2>
          <p className="text-sm italic">What challenges it?</p>
          <Textarea 
            value={data?.laterOn || ''} 
            onChange={(e) => handleChange('laterOn', e.target.value)} 
            placeholder="Write here..." 
            className="h-32" 
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600">OUTCOMES</h2>
        <p className="text-sm">
          How does their change or refusal to change affect the greater story and other characters?
        </p>
        <Textarea 
          value={data?.outcomes || ''} 
          onChange={(e) => handleChange('outcomes', e.target.value)} 
          placeholder="Write here..." 
          className="h-32" 
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600">DO THEY OVERCOME THEIR CORE URGE?</h2>
        <div className="flex items-center space-x-4">
          <Label className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              checked={data?.overcomeUrge === 'yes'}
              onChange={(e) => handleChange('overcomeUrge', e.target.checked ? 'yes' : '')}
              className="form-checkbox" 
            />
            <span>Yes</span>
          </Label>
          <Label className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              checked={data?.overcomeUrge === 'no'}
              onChange={(e) => handleChange('overcomeUrge', e.target.checked ? 'no' : '')}
              className="form-checkbox" 
            />
            <span>No</span>
          </Label>
          <Label className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              checked={data?.overcomeUrge === 'worse'}
              onChange={(e) => handleChange('overcomeUrge', e.target.checked ? 'worse' : '')}
              className="form-checkbox" 
            />
            <span>It's even worse now</span>
          </Label>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600">IF APPLICABLE, WHAT CHANGES ABOUT THEIR...</h2>
        <div className="grid grid-cols-5 gap-4">
          <div className="space-y-2">
            <Label htmlFor="goals" className="text-sm font-semibold text-blue-600">
              GOALS
            </Label>
            <Textarea 
              id="goals" 
              value={data?.changedGoals || ''}
              onChange={(e) => handleChange('changedGoals', e.target.value)}
              placeholder="Write here..." 
              className="h-20" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="relationships" className="text-sm font-semibold text-blue-600">
              RELATIONSHIPS
            </Label>
            <Textarea 
              id="relationships" 
              value={data?.changedRelationships || ''}
              onChange={(e) => handleChange('changedRelationships', e.target.value)}
              placeholder="Write here..." 
              className="h-20" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lifestyle" className="text-sm font-semibold text-blue-600">
              LIFESTYLE
            </Label>
            <Textarea 
              id="lifestyle" 
              value={data?.changedLifestyle || ''}
              onChange={(e) => handleChange('changedLifestyle', e.target.value)}
              placeholder="Write here..." 
              className="h-20" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="presentation" className="text-sm font-semibold text-blue-600">
              PRESENTATION
            </Label>
            <Textarea 
              id="presentation" 
              value={data?.changedPresentation || ''}
              onChange={(e) => handleChange('changedPresentation', e.target.value)}
              placeholder="Write here..." 
              className="h-20" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dialogue" className="text-sm font-semibold text-blue-600">
              DIALOGUE
            </Label>
            <Textarea 
              id="dialogue" 
              value={data?.changedDialogue || ''}
              onChange={(e) => handleChange('changedDialogue', e.target.value)}
              placeholder="Write here..." 
              className="h-20" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}