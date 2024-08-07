import AddPost from './screens/AddPost';
import PostDetails from './screens/PostDetails';
import PostsList from './screens/PostsList';
import {ScreenType} from './types/ScreenType';


type ColorScheme = {
  background: string;
  text: string;
  shadow: string;
  card: string;
};

type ColorsType = {
  light: ColorScheme
  dark: ColorScheme,
};

export const Colors: ColorsType = {
  light: {
    background: '#000',
    text: '#f3f3f3',
    shadow: '#fff',
    card: "#1f1f1f",
  },
  dark: {
    background: '#fff',
    text: '#0c0c0c',
    shadow: '#000',
    card: "#fcfcfc",
  }
};

export const defaultTheme = 'light';

export const screens: ScreenType<any>[] = [
  {name: 'PostsList', component: PostsList},
  {name: 'AddPost', component: AddPost},
  {name: 'PostDetails', component: PostDetails},
];
