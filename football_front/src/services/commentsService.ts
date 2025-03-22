import { axiosInstance } from "./api-client";
export interface Comment {
    owner: string;
    comment: string;
    time?: string;
  }

export const createComment = async (commentData: {
    comment: string;
    postId: string | undefined;
    owner: string | undefined;
}) => {
    return (await axiosInstance.post<Comment>("/comments", commentData)).data;
}

export const getPostComments = async (postId: string) => {
    const posts = await axiosInstance.get<Comment[]>(`/comments/posts/${postId}`);
    return posts.data;
}



