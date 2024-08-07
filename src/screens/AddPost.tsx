import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addPost} from '../redux/slices/PostSlice';
import {Alert, View} from 'react-native';
import {PostType} from '../types/PostType';
import {Input} from '../components/UI/Input';
import {Colors} from '../consts';
import {useTheme} from '../hooks/useTheme';
import {CustomButton} from '../components/UI/CustomButton';
import { postSchema } from '../utils/validation';

/**
 * AddPost component is responsible for adding new posts.
 * It collects title and content from the user and dispatches an action
 * to add the new post to the Redux store.
 */
const AddPost = () => {
  // Redux dispatch function
  const dispatch = useDispatch();

  // Current theme of the app
  const currentTheme = useTheme();

  // State to hold the title and content of the new post
  const [post, setPost] = useState<Pick<PostType, 'title' | 'content'>>({
    title: '',
    content: '',
  });

  /**
   * Updates the title of the new post in the state.
   * @param {string} title - The new title of the post.
   */
  const handleSetTitle = (title: string) => {
    setPost({...post, title});
  };

  /**
   * Updates the content of the new post in the state.
   * @param {string} content - The new content of the post.
   */
  const handleSetContent = (content: string) => {
    setPost({...post, content});
  };

  /**
   * Adds the new post to the Redux store by dispatching an action.
   */
  const handleAddPost = () => {
    // TODO: add status notification

    // Validate the new post
    const validationResult = postSchema.safeParse(post);

    if (!validationResult.success) {
      // If validation fails, show an alert with the validation errors
      const errors = validationResult.error.errors.map(error => error.message).join("\n");
      // TODO: Add Modal Alert Notification
      Alert.alert("Validation Error", errors);
      return;
    }

    // Create a new post object with a unique id, the title and content from the state,
    // and the current date and status.
    const newPost: PostType = {
      id: Date.now().toString(),
      title: post.title,
      content: post.content,
      created_at: new Date().toISOString(),
      active: true,
    };
    // Dispatch the addPost action with the new post as a payload.
    dispatch(addPost(newPost));
  };

  return (
    <View
      style={{
        gap: 10,
        alignContent: 'center',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between',
        padding: 16,
      }}>
      {/* Input fields for the title and content of the new post */}
      <View
        style={{
          width: '100%',
          gap: 16,
          backgroundColor: Colors[currentTheme].card,
          borderRadius: 16,
          padding: 16
        }}>
        <Input
          value={post.title}
          onChangeText={handleSetTitle}
          placeholder="Title"
          label="Title"
        />
        <Input
          editable
          multiline
          numberOfLines={4}
          value={post.content}
          onChangeText={handleSetContent}
          placeholder="Content"
          label="Content"
        />
      </View>
      {/* Button to add the new post to the Redux store */}
      <CustomButton style={{width: '100%'}} onPress={handleAddPost}>
        Add Post
      </CustomButton>
    </View>
  );
};

export default AddPost;
