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

interface Scene {
  heading: ScreenplayElement;
  screen_directions: ScreenplayElement[];
  dialogues: {
    character: string;
    line: ScreenplayElement;
  }[];
}

interface Screenplay {
  id: string;
  title: string;
  author: string;
  preliminaryContent: ScreenplayElement[];
  scenes: Scene[];
  characters: Character[];
}

interface ScreenplayVisualizationProps {
  screenplay: Screenplay;
}

const ScreenplayVisualization: React.FC<ScreenplayVisualizationProps> = ({ screenplay }) => {
  const renderScreenplayElements = () => {
    const allElements: { type: string; element: ScreenplayElement; characterName?: string }[] = [
      ...screenplay.preliminaryContent.map(e => ({ type: 'preliminary', element: e })),
      ...screenplay.scenes.flatMap(scene => [
        { type: 'scene_heading', element: scene.heading },
        ...scene.screen_directions.map(e => ({ type: 'screen_direction', element: e })),
        ...scene.dialogues.flatMap(d => [
          { type: 'character', element: { line_number: d.line.line_number - 1, text: d.character.toUpperCase() } },
          { type: 'dialogue', element: d.line, characterName: d.character }
        ])
      ])
    ];
  
    allElements.sort((a, b) => a.element.line_number - b.element.line_number);
  
    return allElements.map((item, index) => {
      let bgColor, style;
      switch (item.type) {
        case 'preliminary':
          bgColor = 'bg-gray-200';
          style = { marginLeft: '1.5in', maxWidth: 'calc(100% - 2.5in)' };
          break;
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