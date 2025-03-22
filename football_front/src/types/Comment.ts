export interface Comment {
    _id?: string;
    postId: string;
    owner: string;
    comment: string;
    time?: string;
}