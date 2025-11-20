import { Tool, ToolCategory } from './types';
import { 
  PenTool, Image as ImageIcon, Video, Code, 
  Globe, TrendingUp, Cpu, Layers, Command, 
  MessageSquare, Bot, Zap, Search
} from 'lucide-react';

// Mapped from Image 1 (Skills) and Image 2 (The Wheel)
export const AI_TOOLS: Tool[] = [
  // --- WRITING ---
  { id: 'gpt4', name: 'ChatGPT', category: ToolCategory.Writing, description: 'Advanced conversational AI.', icon: 'MessageSquare', url: 'https://chat.openai.com', popular: true, isInternal: true },
  { id: 'claude', name: 'Claude', category: ToolCategory.Writing, description: 'Helpful and harmless AI assistant.', icon: 'MessageSquare', url: 'https://claude.ai', popular: true },
  { id: 'gemini', name: 'Gemini', category: ToolCategory.Writing, description: 'Google\'s multimodal AI.', icon: 'Zap', url: 'https://gemini.google.com', popular: true, isInternal: true },
  { id: 'jasper', name: 'Jasper', category: ToolCategory.Writing, description: 'AI copywriter for marketing.', icon: 'PenTool', url: 'https://www.jasper.ai' },
  { id: 'copyai', name: 'Copy.ai', category: ToolCategory.Writing, description: 'Generate marketing copy in seconds.', icon: 'PenTool', url: 'https://www.copy.ai' },
  { id: 'quillbot', name: 'QuillBot', category: ToolCategory.Writing, description: 'Paraphrasing tool.', icon: 'PenTool', url: 'https://quillbot.com' },
  { id: 'grammarly', name: 'Grammarly', category: ToolCategory.Writing, description: 'AI writing assistance.', icon: 'PenTool', url: 'https://grammarly.com' },
  { id: 'writesonic', name: 'Writesonic', category: ToolCategory.Writing, description: 'AI writer for blogs & ads.', icon: 'PenTool', url: 'https://writesonic.com' },
  
  // --- DESIGN ---
  { id: 'figma', name: 'Figma', category: ToolCategory.Design, description: 'Interface design tool.', icon: 'PenTool', url: 'https://figma.com', popular: true },
  { id: 'canva', name: 'Canva', category: ToolCategory.Design, description: 'Graphic design platform.', icon: 'PenTool', url: 'https://canva.com' },
  { id: 'brandmark', name: 'Brandmark', category: ToolCategory.Design, description: 'AI Logo Maker.', icon: 'PenTool', url: 'https://brandmark.io' },

  // --- IMAGE ---
  { id: 'midjourney', name: 'Midjourney', category: ToolCategory.Image, description: 'Generative artificial intelligence.', icon: 'ImageIcon', url: 'https://midjourney.com', popular: true },
  { id: 'firefly', name: 'Adobe Firefly', category: ToolCategory.Image, description: 'Generative AI for creators.', icon: 'ImageIcon', url: 'https://firefly.adobe.com' },
  { id: 'dalle', name: 'DALL-E 3', category: ToolCategory.Image, description: 'Create realistic images from text.', icon: 'ImageIcon', url: 'https://openai.com/dall-e-3', isInternal: true },
  
  // --- VIDEO ---
  { id: 'runway', name: 'Runway', category: ToolCategory.Video, description: 'AI Magic Tools for video.', icon: 'Video', url: 'https://runwayml.com', popular: true },
  { id: 'pika', name: 'Pika', category: ToolCategory.Video, description: 'Idea-to-video platform.', icon: 'Video', url: 'https://pika.art' },
  { id: 'heygen', name: 'HeyGen', category: ToolCategory.Video, description: 'AI video generation platform.', icon: 'Video', url: 'https://heygen.com' },
  { id: 'invideo', name: 'InVideo', category: ToolCategory.Video, description: 'Turn text into video.', icon: 'Video', url: 'https://invideo.io' },
  
  // --- PRODUCTIVITY ---
  { id: 'notion', name: 'Notion AI', category: ToolCategory.Productivity, description: 'Connected workspace.', icon: 'Layers', url: 'https://notion.so', popular: true },
  { id: 'tldv', name: 'tl;dv', category: ToolCategory.Productivity, description: 'Meeting recorder & summarizer.', icon: 'Layers', url: 'https://tldv.io' },
  { id: 'taskade', name: 'Taskade', category: ToolCategory.Productivity, description: 'AI-powered productivity.', icon: 'Layers', url: 'https://taskade.com' },

  // --- WORKFLOW ---
  { id: 'zapier', name: 'Zapier', category: ToolCategory.Workflow, description: 'Automation that moves you forward.', icon: 'Cpu', url: 'https://zapier.com', popular: true },
  { id: 'make', name: 'Make', category: ToolCategory.Workflow, description: 'Visual automation platform.', icon: 'Cpu', url: 'https://www.make.com' },

  // --- CODE ---
  { id: 'github-copilot', name: 'GitHub Copilot', category: ToolCategory.Code, description: 'Your AI pair programmer.', icon: 'Code', url: 'https://github.com/features/copilot', popular: true },
  { id: 'replit', name: 'Replit', category: ToolCategory.Code, description: 'Collaborative browser based IDE.', icon: 'Code', url: 'https://replit.com', popular: true },
  { id: 'cursor', name: 'Cursor', category: ToolCategory.Code, description: 'The AI Code Editor.', icon: 'Code', url: 'https://cursor.sh' },

  // --- WEBSITE ---
  { id: 'wix', name: 'Wix', category: ToolCategory.Website, description: 'Website builder.', icon: 'Globe', url: 'https://wix.com' },
  { id: 'framer', name: 'Framer', category: ToolCategory.Website, description: 'Design and publish your dream site.', icon: 'Globe', url: 'https://framer.com' },
  { id: '10web', name: '10Web', category: ToolCategory.Website, description: 'AI Website Builder.', icon: 'Globe', url: 'https://10web.io' },

  // --- SEO ---
  { id: 'semrush', name: 'Semrush', category: ToolCategory.SEO, description: 'Online visibility management.', icon: 'Search', url: 'https://semrush.com', popular: true },
  { id: 'vidiq', name: 'VidIQ', category: ToolCategory.SEO, description: 'YouTube growth tools.', icon: 'Video', url: 'https://vidiq.com' },
  { id: 'blogseo', name: 'BlogSEO', category: ToolCategory.SEO, description: 'AI blog writing and SEO.', icon: 'PenTool', url: 'https://blogseo.ai' },

  // --- AGENTS & RAG (From Image 1) ---
  { id: 'langchain', name: 'LangChain', category: ToolCategory.Agents, description: 'Building applications with LLMs.', icon: 'Bot', url: 'https://langchain.com', popular: true },
  { id: 'crewai', name: 'CrewAI', category: ToolCategory.Agents, description: 'Orchestrate role-playing AI agents.', icon: 'Bot', url: 'https://crewai.com' },
  { id: 'autogen', name: 'AutoGen', category: ToolCategory.Agents, description: 'Enable multiple agents to converse.', icon: 'Bot', url: 'https://microsoft.github.io/autogen/' },
];

export const SKILLS_2026 = [
  { title: 'Prompt Engineering', description: 'Structuring contexts for reliability.', tools: ['ChatGPT', 'Claude', 'Gemini'] },
  { title: 'Workflow Automation', description: 'Linking apps for repetitive tasks.', tools: ['Zapier', 'Make', 'n8n'] },
  { title: 'AI Agents', description: 'Multi-step systems without human input.', tools: ['CrewAI', 'LangGraph', 'AutoGen'] },
  { title: 'RAG', description: 'Connecting LLMs to private data sources.', tools: ['LangChain', 'Vectara', 'LlamaIndex'] },
  { title: 'Fine-Tuning', description: 'Adapting models for brand voice.', tools: ['OpenAI', 'Hugging Face', 'Cohere'] },
  { title: 'Multimodal AI', description: 'Understanding text, image, and audio.', tools: ['GPT-4', 'Gemini', 'Grok'] },
  { title: 'AI Video', description: 'Ideas into complete videos.', tools: ['Runway', 'OpusClip', 'Pika'] },
  { title: 'Tool Stacking', description: 'Combining productivity apps.', tools: ['Notion', 'ClickUp', 'Zapier'] },
  { title: 'LLM Evaluation', description: 'Tracking AI performance.', tools: ['Helicone', 'PromptLayer', 'TruLens'] },
];