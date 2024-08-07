import {PostType} from '../types/PostType';
import React, {useEffect, useMemo, useState} from 'react';
import Wrapper from '../components/Wrapper';
import {PostDetailsEditable} from '../components/PostDetailsEditable';
import {PostDetailsUneditable} from '../components/PostDetailsUneditable';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {selectPost, setPost} from '../redux/slices/PostSlice';
import {useAppSelector} from '../hooks/useAppSelector';
import {Loader} from '../components/UI/Loader';

type PostDetailsProps = {
  route: {params: {post: PostType}};
};

/**
 * PostDetails component is responsible for displaying the details of a post.
 * It allows the user to view the post details in an uneditable form.
 * If the user wants to edit the post, they can click on the 'Edit Post' button.
 * The component handles the logic for switching between the uneditable and editable forms.
 * It also handles the logic for updating the post data after editing.
 */
const PostDetails: React.FC<PostDetailsProps> = ({route}): JSX.Element => {
  // State variable to keep track of whether the post is in editable mode or not
  const [isEditable, setIsEditable] = useState<boolean>(false);

  // Redux dispatch function to dispatch actions to the Redux store
  const dispatch = useAppDispatch();

  // Select the post data from the Redux store
  const postWithQueryData = useAppSelector(selectPost);

  // Memoized post object to be displayed in the component
  const post = useMemo(() => {
    if (postWithQueryData) {
      return {
        id: postWithQueryData.id,
        title: postWithQueryData.title,
        content: postWithQueryData.content,
        created_at: postWithQueryData.created_at,
        active: postWithQueryData.active,
      };
    }
  }, [postWithQueryData]);

  /**
   * Function to set the post to editable mode
   */
  const handleSetEditable = (): void => {
    setIsEditable(true);
  };

  /**
   * Function to set the post to uneditable mode
   */
  const handleSetUneditable = (): void => {
    setIsEditable(false);
  };

  /**
   * Effect hook to update the post data after editing
   * It dispatches the setPost action with the updated post data
   */
  useEffect(() => {
    if (route.params.post) {
      dispatch(setPost(route.params.post));
    }

    return () => {
      dispatch(setPost(null));
    }
  }, []);

  // If the post data is not available, show a loader
  if (!post) return <Loader />;

  return (
    <Wrapper>
      {/* Render the post details in either editable or uneditable form */}
      {isEditable ? (
        <PostDetailsEditable post={post} setUneditable={handleSetUneditable} />
      ) : (
        <PostDetailsUneditable post={post} setEditable={handleSetEditable} />
      )}
    </Wrapper>
  );
};
export default PostDetails;
