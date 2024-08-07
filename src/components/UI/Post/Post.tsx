import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import type {PostType} from '../../../types/PostType';
import {styles} from './styles';
import {convertFromUTCToHuman} from '../../../utils/convertFromUTCToHuman';
import {getDeviceLocale} from '../../../utils/getDeviceLocale';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../../hooks/useTheme';
import {Colors} from '../../../consts';

type PostProps = {
  post: PostType;
};

/**
 * Post component is responsible for rendering a single post item.
 * It displays the post's title, creation date, and content.
 * When the post is pressed, it navigates to the PostDetails screen.
 */
const Post: React.FC<PostProps> = ({post}) => {
  // Navigation hook to navigate between screens
  const navigation = useNavigation();

  // Get the device's locale for date formatting
  const deviceLocale = getDeviceLocale();

  // Format the post's creation date to the device's locale
  const date = convertFromUTCToHuman(post.created_at, deviceLocale);

  // Get the current theme from the useTheme hook
  const currentTheme = useTheme();

  /**
   * Navigates to the PostDetails screen when the post is pressed.
   * The post data is passed as a navigation param.
   */
  const navigateToPostDetails = () => {
    navigation.navigate('PostDetails', {post});
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: Colors[currentTheme].card,
          shadowColor: Colors[currentTheme].shadow,
        },
      ]}
      onPress={navigateToPostDetails}>
      {/* Display the post's title */}
      <View style={styles.separate}>
        <Text
          style={[styles.title, {color: Colors[currentTheme].text}]}
          numberOfLines={1}
          ellipsizeMode="tail">
          {post.title}
        </Text>
        {/* Display the post's creation date */}
        <Text style={[styles.date, {color: Colors[currentTheme].text}]}>
          {date}
        </Text>
      </View>
      {/* Display the post's content */}
      <Text
        style={[styles.content, {color: Colors[currentTheme].text}]}
        numberOfLines={1}
        ellipsizeMode="tail">
        {post.content}
      </Text>
    </TouchableOpacity>
  );
};

export default Post;
