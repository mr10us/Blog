import {firebase} from '@react-native-firebase/firestore';
import {PostType} from '../types/PostType';

const db = firebase.firestore();


/**
 * Fetches all active posts from the 'posts' collection in Firestore,
 * ordered by creation date in descending order.
 *
 * @return {Promise<PostType[]>} A promise that resolves with an array of
 *     PostType objects representing the fetched posts.
 * @throws {Error} If there is an error fetching the posts.
 */
export const getPosts = async (): Promise<PostType[]> => {
  try {
    // Query the 'posts' collection for active posts
    const querySnapshot = await db
      .collection('posts')
      .where('active', '==', true) // Filter for active posts
      .orderBy('created_at', 'desc') // Order by creation date in descending order
      .get();

    const posts: PostType[] = [];

    // Iterate over each document in the query snapshot
    querySnapshot.forEach(doc => {
      // Destructure the document data to extract the ID
      const {id, ...rest} = doc.data();

      // Create a new PostType object with the ID and other data
      const post = {id: doc.id, ...rest} as PostType;

      // Add the post to the array of posts
      posts.push(post);
    });

    return posts;
  } catch (error) {
    // Log and re-throw the error if there was an issue fetching the posts
    console.error('Error fetching posts:', error);
    throw error;
  }
};

/**
 * Creates a new post in the 'posts' collection in Firestore.
 *
 * @param {PostType} newPost - The new post object containing the post title,
 *                             content, and creation date.
 * @return {Promise<string>} A promise that resolves with the ID of the newly created post.
 * @throws {Error} If there is an error creating the post.
 */
export const createPost = async (newPost: PostType): Promise<string> => {
  try {
    // Add the new post to the 'posts' collection in Firestore
    const response = await db.collection('posts').add(newPost);

    // Return the ID of the newly created post
    return response.id;
  } catch (error) {
    // If there is an error creating the post, log the error and rethrow the error
    console.error('Error creating post:', error);
    throw error;
  }
};

/**
 * Edits a post in the 'posts' collection in Firestore.
 *
 * @param {Pick<PostType, 'id' | 'title' | 'content'>} updatedPost - The updated post object
 *                                                                   containing the post ID,
 *                                                                   title, and content.
 * @return {Promise<void>} A promise that resolves when the post has been successfully updated.
 * @throws {Error} If there is an error updating the post.
 */
export const editPost = async (
  updatedPost: Pick<PostType, 'id' | 'title' | 'content'>,
): Promise<void> => {
  // Destructure the updatePost object to extract the post ID and the rest of the post details
  const {id: postId, ...post} = updatedPost;

  try {
    // Update the post document in the 'posts' collection with the new post details
    await db.collection('posts').doc(postId).update(post);
  } catch (error) {
    // Log and re-throw the error if there is an error updating the post
    console.error('Error updating post: ', error);
    throw error;
  }
};

/**
 * Deletes a post from the 'posts' collection in Firestore.
 *
 * @param {string} postId - The ID of the post to be deleted.
 * @return {Promise<void>} A promise that resolves when the post has been deleted.
 * @throws {Error} If there is an error deleting the post.
 */
export const deletePost = async (postId: string): Promise<void> => {
  try {
    // Delete the post by updating its 'active' field to false
    await db.collection('posts').doc(postId).update({active: false});
  } catch (error) {
    // Log and re-throw any error that occurs during deletion
    console.error('Error updating post: ', error);
    throw error;
  }
};
