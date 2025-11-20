export enum ToolCategory {
  Writing = 'Writing',
  Design = 'Design',
  Video = 'Video',
  Image = 'Image',
  Productivity = 'Productivity',
  Code = 'Code',
  SEO = 'SEO',
  Website = 'Website',
  Workflow = 'Workflow',
  Agents = 'Agents'
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string; // Lucide icon name or emoji
  url: string;
  popular?: boolean;
  isInternal?: boolean; // If true, opens in the App's Studio
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  credits: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  images?: string[]; // base64
}

export enum StudioMode {
  Chat = 'chat',
  ImageGen = 'image',
  Code = 'code',
  Vision = 'vision'
}