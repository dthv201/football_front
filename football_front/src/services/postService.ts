import { Post } from "../types/Post";

const API_URL = "http://localhost:3000/posts/";

export const getUserPosts = async (token: string, userId: string): Promise<Post[]> => {
  const response = await fetch(`${API_URL}?owner=${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user posts");
  }

  return response.json();
};

export const getAllPosts = async (token: string): Promise<Post[]> => {
  const response = await fetch(`${API_URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user posts");
  }

  return response.json();
};

export const createPost = async (token: string, newPost: Omit<Post, "_id">): Promise<Post> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newPost),
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }

  return response.json();
};

export const updatePost = async (token: string, postId: string, updatedPost: Partial<Post>): Promise<Post> => {
  const response = await fetch(`${API_URL}/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedPost),
  });

  if (!response.ok) {
    throw new Error("Failed to update post");
  }

  return response.json();
};

export const deletePost = async (token: string, postId: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete post");
  }
};
