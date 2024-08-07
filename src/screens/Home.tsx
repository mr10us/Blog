import {useNavigation} from '@react-navigation/native';
import {View, Button, useColorScheme} from 'react-native';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {setTheme} from '../redux/slices/ThemeSlice';
import {useEffect} from 'react';
import Wrapper from '../components/Wrapper';
const Home = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const isDark = useColorScheme() === 'dark';

  useEffect(() => {
    dispatch(setTheme(isDark ? 'dark' : 'light'));
  }, [isDark]);

  return (
    <Wrapper>
      <View>
        <Button
          title="Go to Add Post"
          onPress={() => navigation.navigate('AddPost')}
        />
        <Button
          title="Go to Posts List"
          onPress={() => navigation.navigate('PostsList')}
        />
      </View>
    </Wrapper>
  );
};
export default Home;
