export type CreatePost = Omit<Post, 'id'>;
export interface Post {
  body: string;
  id: number;
  title: string;
  userId: number;
}
export interface PostFilter {
  userId?: number;
}
export type UpdatePost = Partial<CreatePost>;
