export interface Post {
    _id?: string;
    owner: string; 
    title: string;
    content: string; 
    img?: string; 
    date: Date;
    location: string;
    participantsIds?: string[]; 
    likes_number?: number; 
    comments_number?: number;
  }

export interface PostFormData {
  owner: string;
  title: string;
  location: string;
  date: string;
  time: string;
  content: string;
  img?: FileList;
}