import {View, Text} from 'react-native';
import {Colors} from '../../consts';
import {useTheme} from '../../hooks/useTheme';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {removePost} from '../../redux/slices/PostSlice';
import {useNavigation} from '@react-navigation/native';
import {getDeviceLocale} from '../../utils/getDeviceLocale';
import {convertFromUTCToHuman} from '../../utils/convertFromUTCToHuman';
import {PostType} from '../../types/PostType';
import {CustomButton} from '../UI/CustomButton';
import {styles} from './styles';

type PostDetailsUneditableProps = {
  post: PostType;
  setEditable: () => void;
};

/**
 * PostDetailsUneditable component is responsible for displaying the details of a post.
 * It shows the post's title, content, creation date, and provides buttons for editing and deleting the post.
 *
 * @param {PostType} post - The post object to be displayed.
 * @param {() => void} setEditable - Callback function to switch to the editable mode.
 * @returns {JSX.Element} - The rendered component.
 */
const PostDetailsUneditable: React.FC<PostDetailsUneditableProps> = ({
  post,
  setEditable,
}) => {
  // Get the current theme from the hook
  const currentTheme = useTheme();
  // Get the Redux dispatch function from the hook
  const dispatch = useAppDispatch();
  // Get the navigation object from the hook
  const navigation = useNavigation();
  // Get the device locale from the utility function
  const deviceLocale = getDeviceLocale();
  // Convert the UTC date to the human-readable format using the utility function
  const date = convertFromUTCToHuman(post.created_at, deviceLocale);

  /**
   * Handle the delete post action.
   * It dispatches the removePost action with the post ID and navigates to the previous screen.
   *
   * @param {string} postId - The ID of the post to be deleted.
   */
  const handleDeletePost = (postId: string) => {
    // TODO: add desclaimer
    // TODO: add status notification
    dispatch(removePost(postId));
    navigation.goBack();
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 10,
      }}>
      {/* Render the post details */}
      <View
        style={{
          backgroundColor: Colors[currentTheme].card,
          padding: 16,
          borderRadius: 10
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}>
          {/* Render the post title */}
          <Text style={[styles.title, {color: Colors[currentTheme].text}]}>
            {post.title}
          </Text>
          {/* Render the post creation date */}
          <Text style={{color: Colors[currentTheme].text}}>{date}</Text>
        </View>
        {/* Render the post content */}
        <Text style={[styles.content, {color: Colors[currentTheme].text}]}>{post.content}</Text>
      </View>
      {/* Render the buttons for editing and deleting the post */}
      <View style={{gap: 16}}>
        <View style={{flexDirection: 'row', gap: 16}}>
          {/* Render the button for switching to the editable mode */}
          <CustomButton style={{flex: 1}} onPress={setEditable} type="primary">
            Edit Post
          </CustomButton>
          {/* Render the button for deleting the post */}
          <CustomButton onPress={() => handleDeletePost(post.id)} type="danger">
            Delete Post
          </CustomButton>
        </View>
        {/* Render the button for navigating to the posts list */}
        <CustomButton onPress={() => navigation.navigate('PostsList')}>
          Go to Posts List
        </CustomButton>
      </View>
    </View>
  );
};
export default PostDetailsUneditable;
