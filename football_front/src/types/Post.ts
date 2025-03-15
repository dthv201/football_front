import { User } from './User';

export interface Post {
    _id: string;
    filed?: string; 
    type?: string; 
    img?: string; 
    owner: string; 
    participants?: User[]; 
    content: string; 
    likes_number?: number; 
    comments_number?: number;
    title: string;
  }