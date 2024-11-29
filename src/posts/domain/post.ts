export class Post {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public readonly title: string,
    public readonly body: string,
  ) {}
}
