// ~/shadcn-components/component/CharacterMapForm.tsx
import React from 'react';
import { Label } from "~/shadcn-components/ui/label"
import { Input } from "~/shadcn-components/ui/input"
import { Textarea } from "~/shadcn-components/ui/textarea"

export function charactermapform({ data = {}, onChange }: { data?: any, onChange: (data: any) => void }) {
  const handleChange = (field: string, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-600">CHARACTER MAP</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Label htmlFor="character-name" className="text-lg font-semibold">
          CHARACTER NAME
        </Label>
        <Input 
          id="character-name" 
          value={data?.characterName || ''} 
          onChange={(e) => handleChange('characterName', e.target.value)} 
          placeholder="Enter character name" 
          className="flex-1" 
        />
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-blue-600">ORIGIN OF URGE</h2>
          <p className="text-sm">When did the character learn to behave in this way? How did it help them?</p>
          <Textarea 
            value={data?.originOfUrge || ''} 
            onChange={(e) => handleChange('originOfUrge', e.target.value)} 
            placeholder="Write here..." 
            className="h-32" 
          />
          <p className="text-sm text-muted-foreground">Note: this is not necessary to know.</p>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-blue-600">CORE URGE</h2>
          <p className="text-sm italic">A compulsion.</p>
          <p className="text-sm italic">In order to survive / get my needs met, I must...</p>
          <Textarea 
            value={data?.coreUrge || ''} 
            onChange={(e) => handleChange('coreUrge', e.target.value)} 
            placeholder="Write here..." 
            className="h-32" 
          />
          <p className="text-sm text-muted-foreground">Note: this is a general solution to a specific problem.</p>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600">STATED BELIEF (LIE)</h2>
        <p className="text-sm">
          Unhealthy people usually aren't conscious of the fact that their urges are coping mechanisms, so they create a
          narrative to justify the core urge.
        </p>
        <Textarea 
          value={data?.statedBelief || ''} 
          onChange={(e) => handleChange('statedBelief', e.target.value)} 
          placeholder="Write here..." 
          className="h-32" 
        />
      </div>
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-blue-600">THE CORE URGE AFFECTS ALL AREAS OF THEIR LIFE</h2>
        <div className="grid grid-cols-5 gap-4">
          <div className="space-y-2">
            <Label htmlFor="goals" className="text-sm font-semibold text-blue-600">
              GOALS
            </Label>
            <Textarea 
              id="goals" 
              value={data?.goals || ''} 
              onChange={(e) => handleChange('goals', e.target.value)} 
              placeholder="Write here..." 
              className="h-32" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="relationships" className="text-sm font-semibold text-blue-600">
              RELATIONSHIPS
            </Label>
            <Textarea 
              id="relationships" 
              value={data?.relationships || ''} 
              onChange={(e) => handleChange('relationships', e.target.value)} 
              placeholder="Write here..." 
              className="h-32" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lifestyle" className="text-sm font-semibold text-blue-600">
              LIFESTYLE
            </Label>
            <Textarea 
              id="lifestyle" 
              value={data?.lifestyle || ''} 
              onChange={(e) => handleChange('lifestyle', e.target.value)} 
              placeholder="Write here..." 
              className="h-32" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="presentation" className="text-sm font-semibold text-blue-600">
              PRESENTATION
            </Label>
            <Textarea 
              id="presentation" 
              value={data?.presentation || ''} 
              onChange={(e) => handleChange('presentation', e.target.value)} 
              placeholder="Write here..." 
              className="h-32" 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dialogue" className="text-sm font-semibold text-blue-600">
              DIALOGUE
            </Label>
            <Textarea 
              id="dialogue" 
              value={data?.dialogue || ''} 
              onChange={(e) => handleChange('dialogue', e.target.value)} 
              placeholder="Write here..." 
              className="h-32" 
            />
          </div>
        </div>
      </div>
    </div>
  )
}