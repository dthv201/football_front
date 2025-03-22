import { Post } from '../types/Post';
import { axiosInstance } from './api-client';
import { GenerateTeamsResponse } from '../types/Player';

const getAllPosts = async () => {
  const response = await axiosInstance.get<Post[]>(`/posts`);

  return response.data;
};

const getUserPosts = async (userId?: string) => {
  const response = await axiosInstance.get<Post[]>(`/posts`, { params: { userId } });

  return response.data;
};

const getPost = async (postId: string) => {
  const response = await axiosInstance.get<Post>(`/posts/${postId}`);

  return response.data;
};



const createPost = async (newPost: Post) => {
  const response = await axiosInstance.post<Post>(`/posts`, newPost);

  return response.data;
};

const updatePost = async (postId: string, editedPost: Post) => {
  const response = await axiosInstance.put<Post>(`/posts/${postId}`, editedPost);

  return response.data;
};

const deletePost = async (postId: string) => {
  await axiosInstance.delete(`/posts/${postId}`);
};

const handleLike = async (postId: string) => {
  const response = await axiosInstance.post(`posts/like/${postId}`);

  return response.data;
};

const addParticipant = async (postId: string, userId: string) => {
  const response = await axiosInstance.post(`/posts/${postId}/add-participant`, { userId });
  return response.data;
};

const removeParticipant = async (postId: string, userId: string) => {
  const response = await axiosInstance.post(`/posts/${postId}/remove-participant`, { userId });
  return response.data;
};

const splitParticipantsIntoTeams = async (postId: string) => {
  const response = await axiosInstance.post<GenerateTeamsResponse>(`/posts/${postId}/split-teams`);
  return response.data;
};

export { getAllPosts, getUserPosts, createPost, updatePost, deletePost, handleLike, addParticipant, removeParticipant, splitParticipantsIntoTeams, getPost };