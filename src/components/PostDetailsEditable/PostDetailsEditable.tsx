import {Alert, View} from 'react-native';
import {styles} from './styles';
import {useTheme} from '../../hooks/useTheme';
import {Colors} from '../../consts';
import {CustomButton} from '../UI/CustomButton';
import {useState} from 'react';
import {Input} from '../UI/Input';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {setPost, updatePost} from '../../redux/slices/PostSlice';
import {PostType} from '../../types/PostType';
import {postSchema} from '../../utils/validation';

type PostDetailsEditableProps = {
  post: PostType;
  setUneditable: () => void;
};

/**
 * PostDetailsEditable component is responsible for displaying the details of a post in an editable form.
 * It allows the user to edit the post title and content.
 * The component provides functionality to save the changes or cancel the edits.
 */
const PostDetailsEditable: React.FC<PostDetailsEditableProps> = ({
  post,
  setUneditable,
}) => {
  // State variable to keep track of the new post values
  const [newPostValues, setNewPostValues] = useState<{
    title: string;
    content: string;
  }>({
    title: post.title,
    content: post.content,
  });

  // Hook to get the current theme
  const currentTheme = useTheme();

  // Hook to get the Redux dispatch function
  const dispatch = useAppDispatch();

  /**
   * Function to handle the change in the post title
   * @param {string} text - The new post title
   */
  const handleTitleChange = (text: string) => {
    setNewPostValues(prev => ({...prev, title: text}));
  };

  /**
   * Function to handle the change in the post content
   * @param {string} text - The new post content
   */
  const handleContentChange = (text: string) => {
    setNewPostValues(prev => ({...prev, content: text}));
  };

  /**
   * Function to handle the save action
   * It dispatches the updatePost action with the updated post data and calls the setUneditable function
   */
  const handleSaveChanges = () => {
    // Validate the new post
    const validationResult = postSchema.safeParse(post);

    if (!validationResult.success) {
      // If validation fails, show an alert with the validation errors
      const errors = validationResult.error.errors
        .map(error => error.message)
        .join('\n');
      // TODO: Add Modal Alert Notification
      Alert.alert('Validation Error', errors);
      return;
    }

    dispatch(
      updatePost({
        updated_at: Date.now().toString(),
        ...post,
        ...newPostValues,
      }),
    );
    dispatch(
      setPost({updated_at: Date.now().toString(), ...post, ...newPostValues}),
    );
    setUneditable();
  };

  /**
   * Function to handle the cancel action
   * It calls the setUneditable function
   */
  const handleCancelChanges = () => {
    // TODO: Add desclaimer
    // TODO: Add status notification
    setUneditable();
  };

  return (
    <View style={styles.container}>
      {/* Post details container */}
      <View style={[styles.post, {backgroundColor: Colors[currentTheme].card}]}>
        {/* Post title input */}
        <Input
          label="Title"
          placeholder="Title"
          value={newPostValues.title}
          onChangeText={handleTitleChange}
          style={{color: Colors[currentTheme].text}}
        />
        {/* Post content input */}
        <Input
          multiline
          label="Content"
          placeholder="Content"
          value={newPostValues.content}
          onChangeText={handleContentChange}
          style={{color: Colors[currentTheme].text}}
        />
      </View>
      {/* Save and cancel buttons */}
      <View style={{flexDirection: 'row', gap: 16}}>
        <CustomButton
          style={{flex: 1}}
          onPress={handleSaveChanges}
          type="primary">
          Save
        </CustomButton>
        <CustomButton onPress={handleCancelChanges} type="danger">
          Cancel
        </CustomButton>
      </View>
    </View>
  );
};
export default PostDetailsEditable;
