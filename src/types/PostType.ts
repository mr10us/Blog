export type PostType = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at?: string;
  // For archived posts
  // TODO: Implement cron logic for old archives
  active: boolean;
}