export type Comment = {
  body: string;
  email: string;
  id: number;
  name: string;
  postId: number;
};
export type CreatePost = Omit<Posts, 'id'>;
export type PostFilter = {
  userId?: number;
};
export type Posts = {
  body: string;
  id: number;
  title: string;
  userId: number;
};
export type UpdatePost = Partial<CreatePost>;
