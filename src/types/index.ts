// src/types/index.ts

// Enum for Medium types
export enum Medium {
    Music = 'Music',
    Writing = 'Writing',
    Acting = 'Acting'
  }
  
  // Enum for Genre types (you can expand this based on your needs)
  export enum Genre {
    // Music genres
    IndieRock = 'Indie Rock',
    Metal = 'Metal',
    Country = 'Country',
    HipHop = 'Hip Hop',
    Jazz = 'Jazz',
  
    // Writing genres
    Screenwriting = 'Screenwriting',
    Poetry = 'Poetry',
    Novels = 'Novels',
    ShortStories = 'Short Stories',
  
    // Acting genres
    StageActing = 'Stage Acting',
    ScreenActing = 'Screen Acting',
    MethodActing = 'Method Acting',
    Improv = 'Improv'
  }
  
  // Enum for Skill types (you can expand this based on your needs)
// Enum for Skill types (you can expand this based on your needs)
export enum Skill {
    // Music skills
    Production = 'Production',
    Guitar = 'Guitar',
    Bass = 'Bass',
    Drums = 'Drums',
    Piano = 'Piano',
    Saxophone = 'Saxophone',
  
    // Writing skills
    Dialogue = 'Dialogue',
    StoryStructure = 'Story Structure',
    Prose = 'Prose',
    Characters = 'Characters',
    Comedy = 'Comedy',
    Romance = 'Romance',
  
    // Acting skills
    Humor = 'Humor',
    Drama = 'Drama',
    Physicality = 'Physicality',
    ActingDialogue = 'Acting Dialogue'
  }
  
  // Type for route params
  export type RouteParams = {
    medium: Medium;
    genre: Genre;
    skill: Skill;
  }
  
  // Type for feedback items
  export type FeedbackItem = {
    id: number;
    title: string;
    sender: string;
    date: string;
    content: string;
  }
  
  // Type for project items
  export type ProjectItem = {
    id: number;
    title: string;
    description: string;
    date: string;
    details: string;
  }
  
  // Type for league members
  export type LeagueMember = {
    id: number;
    name: string;
    points: number;
    avatar: string;
  }
  
  // Type for messages
  export type Message = {
    id: number;
    sender: string;
    content: string;
    timestamp: string;
    isSelf: boolean;
  }
  
  // Type for user profile
  export type UserProfile = {
    id: number;
    name: string;
    username: string;
    avatar: string;
    bio: string;
    skills: Skill[];
    recentProjects: string[];
  }
  
  // Type for settings
  export type UserSettings = {
    email: string;
    notifications: boolean;
    darkMode: boolean;
  }
  
  // Type for the feedback detail component props
  export type FeedbackDetailProps = {
    genre: Genre;
    skill: Skill;
  }
  
  // Type for the project detail component props
  export type ProjectDetailProps = {
    genre: Genre;
    skill: Skill;
  }
  
  // Type for the feedback details components
  export type FeedbackDetailsComponents = {
    [key in Medium]: React.FC<FeedbackDetailProps>;
  }
  
  // Type for the project details components
  export type ProjectDetailsComponents = {
    [key in Medium]: React.FC<ProjectDetailProps>;
  }
  
  // Type for genre options
  export type GenreOptions = {
    [key in Medium]: Genre[];
  }
  
  // Type for skill options
  export type SkillOptions = {
    [key in Medium]: Skill[];
  }