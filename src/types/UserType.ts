export type UserType = {
  id: number;
  name?: string;
  secondName?: string;
  fullName: string;
  email: string;

  image?: string;

  active: boolean;

  created_at: string;
  updated_at?: string;
  locale?: string;
};
