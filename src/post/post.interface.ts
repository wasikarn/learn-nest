export interface Comment {
  body: string;
  email: string;
  id: number;
  name: string;
  postId: number;
}
export type CreatePost = Omit<Posts, 'id'>;
export interface PostFilter {
  userId?: number;
}
export interface Posts {
  body: string;
  id: number;
  title: string;
  userId: number;
}
export type UpdatePost = Partial<CreatePost>;
