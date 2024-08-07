// PostsList.js
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {fetchPosts, selectPosts} from '../redux/slices/PostSlice';
import {FlatList, useColorScheme} from 'react-native';
import Wrapper from '../components/Wrapper';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {Loader} from '../components/UI/Loader';
import {Error} from '../components/UI/Error';
import {Empty} from '../components/UI/Empty';
import {Post} from '../components/UI/Post';
import { AddPostFloadButton } from '../components/AddPostFloatButton';
import { BottomDrawer } from '../components/UI/BottomDrawer';
import AddPost from './AddPost';
import { setTheme } from '../redux/slices/ThemeSlice';

/**
 * PostsList component renders a list of posts.
 * It also handles loading state, error state and empty state.
 * It also includes a modal for adding new posts.
 */
const PostsList = () => {
  // State for managing the modal visibility
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Redux state selectors
  const {posts, isLoading, error, isError} = useSelector(selectPosts);

  // Redux dispatch
  const dispatch = useAppDispatch();

  // Check if the list of posts is empty
  const isEmptyPosts = posts.length === 0;

  // Get the current theme from the device
  const isDark = useColorScheme() === 'dark';

  /**
   * Toggle the modal visibility
   */
  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  }

  /**
   * Fetch posts on component mount
   */
  
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  /**
   * Set the theme based on the current state
   */

  useEffect(() => {
    dispatch(setTheme(isDark ? 'dark' : 'light'));
  }, [isDark]);

  /**
   * Close the modal after adding a new post
   * This is a temporary solution to prevent props drilling
   */
  useEffect(() => {
    if (isModalOpen) {
      toggleModal();
    }
  }, [posts])

  /**
   * Render the component based on the loading, error and empty states
   */
  if (isLoading) return <Loader />;
  if (isError) return <Error error={error} />;

  return (
    <Wrapper>
      {/* Render the list of posts or an empty state */}
      {isEmptyPosts ? (
        <Empty />
      ) : (
          <FlatList
            data={posts}
            style={{paddingHorizontal: 5}}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <Post post={item} />}
          />
      )}
      {/* Render the modal for adding new posts */}
      <BottomDrawer isOpen={isModalOpen} closeModal={toggleModal}>
        <AddPost />
      </BottomDrawer>
      {/* Render the floating button for adding new posts */}
      <AddPostFloadButton onPress={toggleModal}/>
    </Wrapper>
  );
};

export default PostsList;
