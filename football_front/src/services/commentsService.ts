import { axiosInstance } from "./api-client";
import { Comment } from "../types/Comment";

export const createComment = async (comment: Comment) => {
        const response = await axiosInstance.post<Comment>("/comments", comment);
        return response.data;
};