import React, { useState, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocumentProxy, TextItem } from 'pdfjs-dist/types/src/display/api';

interface ScreenplayElement {
  line_number: number;
  text: string;
}

interface Character {
  name: string;
  dialogue: ScreenplayElement[];
}

interface Screenplay {
    title: string;
    author: string;
    preliminaryContent: ScreenplayElement[];
    scene_headings: ScreenplayElement[];
    characters: Character[];
    screen_directions: ScreenplayElement[];
    dialogues: ScreenplayElement[];
  }

interface ScreenplayFormat {
  sceneHeadingSpaces: number;
  screenDirectionSpaces: number;
  characterNameSpaces: number;
  dialogueSpaces: number;
}

interface TitlePageInfo {
  title: string;
  author: string;
}

const PDFComponent: React.FC<{ onScreenplayParsed: (screenplay: Screenplay) => void }> = ({ onScreenplayParsed }) => {
  const [extractedText, setExtractedText] = useState<string>('');
  const [parsedScreenplay, setParsedScreenplay] = useState<Screenplay | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const setupPdfWorker = async () => {
      const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.mjs');
      pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker.default;
    };
    setupPdfWorker();
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    setIsLoading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      const text = await extractTextFromPdf(pdf);
      setExtractedText(text);
      const lines = text.split('\n');
      
      const titlePageInfo = extractTitlePageInfo(lines);
      let screenplayText = text;
      if (titlePageInfo) {
        console.log("Title:", titlePageInfo?.title);
        console.log("Author:", titlePageInfo?.author);
        
        // Find the start of the actual screenplay content
        const { contentStartIndex, includeTitle } = findScreenplayContent(lines);
        
        if (contentStartIndex !== -1) {
          // If we need to include the title, start from the beginning
          // Otherwise, start from the content start index
          screenplayText = lines.slice(includeTitle ? 0 : contentStartIndex).join('\n');
        }
      }
  
      const format = detectScreenplayFormat(screenplayText);
      const screenplay = parseScreenplay(screenplayText.split('\n'), format, titlePageInfo);
      const sceneHeadings = parseSceneHeadings(screenplayText.split('\n'), format);
      const screenDirections = parseScreenDirections(screenplayText.split('\n'), format);
      const processedScreenplay = postProcessScreenplay({
        ...screenplay,
        scene_headings: sceneHeadings,
        screen_directions: screenDirections
      });
      setParsedScreenplay(processedScreenplay);
      onScreenplayParsed(processedScreenplay); // Call the callback with the processed screenplay
      console.log("Parsed Screenplay JSON:", JSON.stringify(processedScreenplay, null, 2));
    } catch (error) {
      console.error('Error processing PDF:', error);
      setExtractedText('Error processing PDF');
      setParsedScreenplay(null);
    } finally {
      setIsLoading(false);
    }
  };
  
  const findScreenplayContent = (lines: string[]): { contentStartIndex: number; includeTitle: boolean } => {
    let titleIndex = -1;
    let contentStartIndex = -1;
    let basedOnIndex = -1;
    let epigraphIndex = -1;
    let includeTitle = false;
  
    for (let i = 0; i < lines.length; i++) {
      const trimmedLine = lines[i]?.trim().toUpperCase() ?? '';

      if (trimmedLine === 'FADE IN:' || 
          trimmedLine.startsWith('INT') || 
          trimmedLine.startsWith('EXT') ||
          trimmedLine.startsWith('INT/EXT')) {
        contentStartIndex = i;
        break;
      }
  
      // Check for title
      if (titleIndex === -1 && trimmedLine && trimmedLine === trimmedLine.toUpperCase() && trimmedLine.length > 3) {
        titleIndex = i;
      }
  
      // Check for "Based on" section
      if (trimmedLine.startsWith('BASED ON')) {
        basedOnIndex = i;
      }
  
      // Check for epigraphs
      if (trimmedLine.startsWith('EPIGRAPH')) {
        epigraphIndex = i;
        break;
      }
  
      // Check for content that should be included (like in the TENET script)
      if (trimmedLine.includes('ORCHESTRA') || trimmedLine.includes('TERRORIST') || trimmedLine.includes('AUDIENCE')) {
        contentStartIndex = i;
        includeTitle = true;
        break;
      }
    }
  
    // If we found epigraphs, start from there
    if (epigraphIndex !== -1) {
      return { contentStartIndex: epigraphIndex, includeTitle: false };
    }
  
    // If we found "Based on" section, start from the next line
    if (basedOnIndex !== -1) {
      return { contentStartIndex: basedOnIndex + 1, includeTitle: false };
    }
  
    // If we found a specific content start, use that
    if (contentStartIndex !== -1) {
      return { contentStartIndex, includeTitle };
    }
  
    // If we only found a title, start from the next line
    if (titleIndex !== -1) {
      return { contentStartIndex: titleIndex + 1, includeTitle: false };
    }
  
    // If we couldn't find any specific start, include everything
    return { contentStartIndex: 0, includeTitle: true };
  };
  
  const detectScreenplayFormat = (text: string): ScreenplayFormat => {
    const lines = text.split('\n');
    let format: ScreenplayFormat = {
      sceneHeadingSpaces: 27,
      screenDirectionSpaces: 27,
      characterNameSpaces: 63,
      dialogueSpaces: 45
    };
  
    for (const line of lines) {
      if (line.length > 0) {
        const leadingSpaces = line.length - line.trimLeft().length;
        if (leadingSpaces === 22 && line.trim() === line.trim().toUpperCase()) {
          format = {
            sceneHeadingSpaces: 22,
            screenDirectionSpaces: 22,
            characterNameSpaces: 67,
            dialogueSpaces: 46
          };
          break;
        } else if (leadingSpaces === 27 && line.trim() === line.trim().toUpperCase()) {
          break;
        }
      }
    }
  
    return format;
  };

  const extractTitlePageInfo = (lines: string[]): TitlePageInfo | null => {
    let title = '';
    let author = '';
    let titleFound = false;
    let authorFound = false;
  
    for (let i = 0; i < Math.min(lines.length, 30); i++) {
      const line = lines[i]?.trim() ?? '';  
      if (line.length === 0) continue;
  
      if (!titleFound && line === line.toUpperCase() && line.length > 3) {
        title = line;
        titleFound = true;
        // Check if the next line is also in uppercase and part of the title
        if (i + 1 < lines.length && lines[i + 1]?.trim() === lines[i + 1]?.trim().toUpperCase()) {
          title += ' ' + lines[i + 1]?.trim();
          i++;
        }
      } else if (titleFound && !authorFound && 
                 (line.toLowerCase().includes('written by') || 
                  line.toLowerCase().includes('by'))) {
        authorFound = true;
        // Look for the author in the next few lines
        for (let j = i + 1; j < i + 4 && j < lines.length; j++) {
          const possibleAuthor = lines[j]?.trim();
          if (possibleAuthor && possibleAuthor !== possibleAuthor?.toUpperCase()) {
            author = possibleAuthor;
            break;
          }
        }
      }
  
      if (titleFound && authorFound && author) break;
    }
  
    if (titleFound && authorFound && author) {
      return { title, author };
    }
  
    return null;
  }

  const formatTextContent = (textItems: TextItem[], format: ScreenplayFormat): string => {
    const lineHeight = 12; // Adjust based on your PDF's typical line height
    let formattedText = '';
    let lastY = 0;
    let lastX = 0;
  
    textItems.forEach((item) => {
      if (Math.abs(lastY - item.transform[5]) > lineHeight / 2) {
        // New line
        formattedText += '\n';
        lastX = 0;
      }
      const spaces = Math.max(0, Math.round((item.transform[4] - lastX) / 4)); // Adjust divisor as needed
      
      // Determine the number of spaces to add based on the detected format
      let spacesToAdd = spaces;
      if (spaces >= format.sceneHeadingSpaces - 5 && spaces <= format.sceneHeadingSpaces + 5) {
        spacesToAdd = format.sceneHeadingSpaces;
      } else if (spaces >= format.characterNameSpaces - 5 && spaces <= format.characterNameSpaces + 5) {
        spacesToAdd = format.characterNameSpaces;
      } else if (spaces >= format.dialogueSpaces - 5 && spaces <= format.dialogueSpaces + 5) {
        spacesToAdd = format.dialogueSpaces;
      }
  
      formattedText += ' '.repeat(spacesToAdd) + item.str;
      lastY = item.transform[5];
      lastX = item.transform[4] + item.width;
    });
  
    return formattedText;
  };

  const extractTextFromPdf = async (pdf: PDFDocumentProxy): Promise<string> => {
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = formatTextContent(textContent.items as TextItem[], { sceneHeadingSpaces: 27, screenDirectionSpaces: 27, characterNameSpaces: 63, dialogueSpaces: 45 });
      fullText += pageText + '\n';
    }
  
    const format = detectScreenplayFormat(fullText);
    
    // Re-format the text using the detected format
    let formattedText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = formatTextContent(textContent.items as TextItem[], format);
      formattedText += pageText + '\n';
    }
  
    return formattedText;
  };

  const parseScreenplay = (lines: string[], format: ScreenplayFormat, titlePageInfo: TitlePageInfo | null): Screenplay => {
    const screenplay: Screenplay = {
      title: titlePageInfo?.title || '',
      author: titlePageInfo?.author || '',
      preliminaryContent: [],
      scene_headings: [],
      characters: [],
      screen_directions: [],
      dialogues: []
    };
  
    let currentCharacter: string | null = null;
    let currentDialogue: string[] = [];
    let dialogueStartLine: number | null = null;
  
    const finalizeDialogue = () => {
      if (currentDialogue.length > 0 && currentCharacter && dialogueStartLine !== null) {
        const dialogueText = currentDialogue.join(' ').trim();
        if (dialogueText) {
          const dialogueElement: ScreenplayElement = {
            line_number: dialogueStartLine,
            text: dialogueText
          };
          screenplay.dialogues.push(dialogueElement);
          const existingCharacter = screenplay.characters.find(char => char.name === currentCharacter);
          if (existingCharacter) {
            existingCharacter.dialogue.push(dialogueElement);
          } else {
            screenplay.characters.push({ name: currentCharacter, dialogue: [dialogueElement] });
          }
        }
        currentDialogue = [];
        dialogueStartLine = null;
      }
    };
  
    const isSceneHeading = (line: string) => {
        return line?.trim().startsWith('INT') || line?.trim().startsWith('EXT') || line?.trim().startsWith('INT/EXT');
      };
    
      lines.forEach((line, index) => {
        const trimmedLine = line.trim();
    
        if (isSceneHeading(line)) {
          finalizeDialogue();
          screenplay.scene_headings.push({ line_number: index + 1, text: trimmedLine });
        } else if (line.startsWith(' '.repeat(format.characterNameSpaces))) {
          finalizeDialogue();
          currentCharacter = trimmedLine.replace(/ \(CONT'D\)$/, '').trim();
        } else if (line.startsWith(' '.repeat(format.dialogueSpaces)) && currentCharacter) {
          if (currentDialogue?.length === 0) {
            dialogueStartLine = index + 1;
          }
          currentDialogue.push(trimmedLine);
        } else if (trimmedLine && !trimmedLine.match(/^\d+\.$/)) { // Ignore page numbers
          finalizeDialogue();
          screenplay.screen_directions.push({ line_number: index + 1, text: trimmedLine });
        }
      });
    
      finalizeDialogue();
    
      return screenplay;
    };

    const postProcessScreenplay = (screenplay: Screenplay): Screenplay => {
      // Merge consecutive screen directions
      const mergedScreenDirections: ScreenplayElement[] = screenplay.screen_directions.reduce((acc, direction) => {
        const lastDirection = acc[acc.length - 1];
        
        if (!lastDirection || direction.line_number !== lastDirection.line_number + 1) {
          acc.push({ ...direction });
        } else {
          lastDirection.text += ' ' + direction.text;
        }
        
        return acc;
      }, [] as ScreenplayElement[]);
    
      screenplay.screen_directions = mergedScreenDirections;
    
      // Handle character name continuations
      screenplay.characters = screenplay.characters.map(character => {
        const nameParts = character.name.split('(');
        const name = nameParts[0]?.trim() ?? '';
        const continuation = nameParts[1] ? ' (' + nameParts[1].trim() : '';
        return { ...character, name: name + continuation };
      });
    
      return screenplay;
    };

  const parseSceneHeadings = (lines: string[], format: ScreenplayFormat): ScreenplayElement[] => {
    const sceneHeadings: ScreenplayElement[] = [];
  
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      if (line.startsWith(' '.repeat(format.sceneHeadingSpaces)) && 
          !line.startsWith(' '.repeat(format.sceneHeadingSpaces + 1)) && 
          trimmedLine.length > 0 &&
          (trimmedLine.includes('INT') || trimmedLine.includes('EXT')) &&
          (trimmedLine.startsWith('INT') || trimmedLine.startsWith('EXT') || trimmedLine.startsWith('INT/EXT'))) {
        sceneHeadings.push({
          line_number: index + 1,
          text: trimmedLine
        });
      }
    });
  
    return sceneHeadings;
  };
  
  const parseScreenDirections = (lines: string[], format: ScreenplayFormat): ScreenplayElement[] => {
    const screenDirections: ScreenplayElement[] = [];
    let currentDirection: ScreenplayElement | null = null;
  
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      if (line.startsWith(' '.repeat(format.screenDirectionSpaces)) && 
          !line.startsWith(' '.repeat(format.screenDirectionSpaces + 1)) && 
          trimmedLine.length > 0 &&
          !(trimmedLine.includes('INT') || trimmedLine.includes('EXT')) &&
          !(trimmedLine.startsWith('INT') || trimmedLine.startsWith('EXT') || trimmedLine.startsWith('INT/EXT'))) {
        
        if (currentDirection) {
          currentDirection.text += ' ' + trimmedLine;
        } else {
          currentDirection = {
            line_number: index + 1,
            text: trimmedLine
          };
        }
      } else {
        if (currentDirection) {
          screenDirections.push(currentDirection);
          currentDirection = null;
        }
      }
    });
  
    if (currentDirection) {
      screenDirections.push(currentDirection);
    }
  
    return screenDirections;
  };
  
  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([extractedText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "extracted_screenplay.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const renderScreenplayElements = () => {
    if (!parsedScreenplay) return null;
  
    const allElements: { type: string; element: ScreenplayElement; characterName?: string }[] = [
      ...parsedScreenplay.scene_headings.map(e => ({ type: 'scene_heading', element: e })),
      ...parsedScreenplay.screen_directions.map(e => ({ type: 'screen_direction', element: e })),
      ...parsedScreenplay.characters.flatMap(char => 
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
    <div className="max-w-4xl mx-auto">
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileUpload}
        className="mb-4 p-2 border rounded"
      />
      {isLoading && <p>Processing PDF...</p>}
      {extractedText && (
        <button 
          onClick={downloadTxtFile}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Download as TXT
        </button>
      )}
      {parsedScreenplay && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Screenplay Visualization:</h2>
          <div className="screenplay-visualization" style={{ width: '8.5in', margin: '0 auto', backgroundColor: 'white', padding: '1in', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
            {renderScreenplayElements()}
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFComponent;
export type { Screenplay };