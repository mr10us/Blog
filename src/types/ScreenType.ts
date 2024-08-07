export type ScreenType<T> = {
  name: string;
  component: React.FC<T>;
};
