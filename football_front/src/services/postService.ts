import { Post } from '../types/Post';
import { axiosInstance } from './api-client';
import {PostFormData} from '../types/Post';

const getAllPosts = async () => {
  const response = await axiosInstance.get<Post[]>(`/posts`);

  return response.data;
};

const getUserPosts = async (userId?: string) => {
  const response = await axiosInstance.get<Post[]>(`/posts`, { params: { userId } });

  return response.data;
};


const createPost = async (newPost: Post) => {
  const response = await axiosInstance.post<Post>(`/posts`, newPost);

  return response.data;
};

const updatePost = async (postId: string, editedPost: PostFormData) => {
  const response = await axiosInstance.put<Post>(`/$posts/${postId}`, editedPost);

  return response.data;
};

const deletePost = async (postId: string) => {
  await axiosInstance.delete(`/posts/${postId}`);
};

const handleLike = async (postId: string) => {
  const response = await axiosInstance.post(`posts/like/${postId}`);

  return response.data;
};


export { getAllPosts, getUserPosts, createPost, updatePost, deletePost, handleLike };