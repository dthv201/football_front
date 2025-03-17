import { Post } from "../../types/Post";

export interface PostFormData {
  owner: string;
  title: string;
  location: string;
  date: string;
  time: string;
  content: string;
  img?: FileList;
}

export interface LocationState {
    state: {
      post?: Post;
    };
}