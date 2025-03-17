import { User } from './User';

export interface Post {
    _id: string;
    owner: string; 
    title: string;
    content: string; 
    img?: string; 
    date: Date;
    location: string;
    participants?: User[]; 
    likes_number?: number; 
    comments_number?: number;
  }