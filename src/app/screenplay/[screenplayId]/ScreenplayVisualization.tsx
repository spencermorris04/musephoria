'use client';

import React from 'react';

interface ScreenplayElement {
  line_number: number;
  text: string;
}

interface Character {
  name: string;
  dialogue: ScreenplayElement[];
}

interface Screenplay {
  id: string;
  title: string;
  author: string;
  preliminaryContent: ScreenplayElement[];
  scene_headings: ScreenplayElement[];
  characters: Character[];
  screen_directions: ScreenplayElement[];
  dialogues: ScreenplayElement[];
}

interface ScreenplayVisualizationProps {
  screenplay: Screenplay;
}

const ScreenplayVisualization: React.FC<ScreenplayVisualizationProps> = ({ screenplay }) => {
  const renderScreenplayElements = () => {
    const allElements: { type: string; element: ScreenplayElement; characterName?: string }[] = [
      ...screenplay.scene_headings.map(e => ({ type: 'scene_heading', element: e })),
      ...screenplay.screen_directions.map(e => ({ type: 'screen_direction', element: e })),
      ...screenplay.characters.flatMap(char => 
        char.dialogue.flatMap(d => [
          { type: 'character', element: { line_number: d.line_number - 1, text: char.name.toUpperCase() } },
          { type: 'dialogue', element: d, characterName: char.name }
        ])
      )
    ];
  
    allElements.sort((a, b) => a.element.line_number - b.element.line_number);
  
    return allElements.map((item, index) => {
      let bgColor, style;
      switch (item.type) {
        case 'scene_heading':
          bgColor = 'bg-blue-200';
          style = { marginLeft: '1.5in', maxWidth: 'calc(100% - 2.5in)' };
          break;
        case 'screen_direction':
          bgColor = 'bg-green-200';
          style = { marginLeft: '1.5in', maxWidth: 'calc(100% - 2.5in)' };
          break;
        case 'character':
          bgColor = 'bg-yellow-200';
          style = { marginLeft: '3.7in', maxWidth: 'calc(100% - 4.7in)' };
          break;
        case 'dialogue':
          bgColor = 'bg-red-200';
          style = { marginLeft: '2.5in', maxWidth: 'calc(100% - 3.5in)' };
          break;
        default:
          bgColor = 'bg-gray-200';
          style = {};
      }
  
      return (
        <div key={index} className="my-2">
          <div className={`p-1 rounded ${bgColor} inline-block`} style={style}>
            {item.element.text}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="screenplay-visualization" style={{ width: '8.5in', margin: '0 auto', backgroundColor: 'white', padding: '1in', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      {renderScreenplayElements()}
    </div>
  );
};

export default ScreenplayVisualization;