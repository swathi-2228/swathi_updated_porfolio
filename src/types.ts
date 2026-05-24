export type AppId = 
  | 'about' 
  | 'education'
  | 'experience'
  | 'skills' 
  | 'projects' 
  | 'resume' 
  | 'services' 
  | 'contact' 
  | 'gmail' 
  | 'whatsapp' 
  | 'github' 
  | 'linkedin';

export interface WindowState {
  id: AppId;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}
