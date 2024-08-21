// src/utils/questions.ts

export type Question = {
  id: number;
  text: string;
};

const questions: Record<string, Record<string, Record<string, Question[]>>> = {
  music: {
    "indie-rock": {
      guitar: [
        { id: 1, text: "How can I create more unique indie rock guitar riffs?" },
        { id: 2, text: "What are some essential effects pedals for indie rock guitar?" },
        { id: 3, text: "How can I incorporate more complex chord progressions in my indie rock playing?" },
      ],
      production: [
        { id: 4, text: "How can I achieve a lo-fi sound in my indie rock productions?" },
        { id: 5, text: "What are some tips for mixing vocals in indie rock tracks?" },
        { id: 6, text: "How can I create more spacious mixes in indie rock production?" },
      ],
      bass: [
        { id: 7, text: "What are some techniques to make bass lines more prominent in indie rock?" },
        { id: 8, text: "How can I improve my fingerstyle bass technique for indie rock?" },
        { id: 9, text: "What are some recommended bass pedals for indie rock?" },
      ],
      drums: [
        { id: 10, text: "How can I create more interesting drum patterns for indie rock?" },
        { id: 11, text: "What are some tips for recording drums in a home studio for indie rock?" },
        { id: 12, text: "How can I incorporate electronic drums into my indie rock setup?" },
      ],
    },
    metal: {
      guitar: [
        { id: 13, text: "How can I improve my speed and accuracy for metal guitar solos?" },
        { id: 14, text: "What are some essential techniques for rhythmic metal guitar playing?" },
        { id: 15, text: "How can I achieve a heavier guitar tone for metal?" },
      ],
      drums: [
        { id: 16, text: "How can I improve my double bass drumming technique?" },
        { id: 17, text: "What are some tips for recording metal drums at home?" },
        { id: 18, text: "How can I create more complex blast beat patterns?" },
      ],
      vocals: [
        { id: 19, text: "How can I learn and practice screaming vocals safely?" },
        { id: 20, text: "What are some techniques for improving vocal stamina for metal performances?" },
        { id: 21, text: "How can I blend clean and harsh vocals effectively in metal songs?" },
      ],
      production: [
        { id: 22, text: "What are some tips for mixing and mastering metal tracks?" },
        { id: 23, text: "How can I achieve a more professional sound in my metal productions?" },
        { id: 24, text: "What are some recommended plugins for metal production?" },
      ],
    },
    "hip-hop": {
      production: [
        { id: 25, text: "How can I create more unique and catchy hip-hop beats?" },
        { id: 26, text: "What are some techniques for sampling in hip-hop production?" },
        { id: 27, text: "How can I improve my drum programming skills for hip-hop?" },
      ],
      vocals: [
        { id: 28, text: "How can I improve my flow and delivery in hip-hop?" },
        { id: 29, text: "What are some exercises to increase my rapping speed?" },
        { id: 30, text: "How can I write more compelling hip-hop lyrics?" },
      ],
    },
  },
  writing: {
    screenwriting: {
      dialogue: [
        { id: 31, text: "How can I make my dialogue sound more natural?" },
        { id: 32, text: "What are some techniques for writing subtext in dialogue?" },
        { id: 33, text: "How can I differentiate character voices in my screenplay?" },
      ],
      "story-structure": [
        { id: 34, text: "How can I improve the pacing in my screenplay?" },
        { id: 35, text: "What are some effective ways to outline a screenplay?" },
        { id: 36, text: "How can I create more compelling character arcs in my screenplay?" },
      ],
    },
    "novel-writing": {
      "character-development": [
        { id: 37, text: "How can I create more complex and believable characters?" },
        { id: 38, text: "What are some techniques for revealing character through action?" },
        { id: 39, text: "How can I write effective character backstories?" },
      ],
      "world-building": [
        { id: 40, text: "How can I create a rich and detailed fictional world?" },
        { id: 41, text: "What are some tips for seamlessly integrating world-building into my narrative?" },
        { id: 42, text: "How can I avoid info-dumping when introducing my fictional world?" },
      ],
    },
    poetry: {
      "poetic-forms": [
        { id: 43, text: "How can I write a compelling sonnet?" },
        { id: 44, text: "What are some tips for mastering free verse poetry?" },
        { id: 45, text: "How can I effectively use rhyme and meter in my poetry?" },
      ],
      imagery: [
        { id: 46, text: "How can I create more vivid imagery in my poetry?" },
        { id: 47, text: "What are some techniques for using metaphors and similes effectively?" },
        { id: 48, text: "How can I evoke stronger emotions through imagery in my poems?" },
      ],
    },
  },
  acting: {
    "stage-acting": {
      physicality: [
        { id: 49, text: "How can I improve my stage presence?" },
        { id: 50, text: "What are some exercises to improve body awareness on stage?" },
        { id: 51, text: "How can I use physical movement to enhance my character portrayal?" },
      ],
      "voice-projection": [
        { id: 52, text: "How can I project my voice effectively on stage?" },
        { id: 53, text: "What are some vocal warm-up exercises for stage actors?" },
        { id: 54, text: "How can I maintain vocal health during long performances?" },
      ],
    },
    "screen-acting": {
      "camera-technique": [
        { id: 55, text: "How can I appear more natural on camera?" },
        { id: 56, text: "What are some tips for hitting my marks while maintaining a natural performance?" },
        { id: 57, text: "How can I adjust my performance for different shot sizes?" },
      ],
      "emotional-recall": [
        { id: 58, text: "How can I use emotional recall techniques in my screen acting?" },
        { id: 59, text: "What are some exercises to access and control emotions for scenes?" },
        { id: 60, text: "How can I maintain emotional continuity across multiple takes?" },
      ],
    },
    "voice-acting": {
      "character-voices": [
        { id: 61, text: "How can I develop a wider range of character voices?" },
        { id: 62, text: "What are some techniques for maintaining consistent character voices?" },
        { id: 63, text: "How can I improve my accent and dialect skills for voice acting?" },
      ],
      "microphone-technique": [
        { id: 64, text: "How can I improve my microphone technique for voice acting?" },
        { id: 65, text: "What are some tips for reducing mouth noise in voice recordings?" },
        { id: 66, text: "How can I maintain consistent volume and tone in long recording sessions?" },
      ],
    },
  },
};

export function getQuestions(medium: string, genre: string, skill: string): Question[] {
  return questions[medium]?.[genre]?.[skill] || [];
}