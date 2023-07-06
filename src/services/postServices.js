// public routes
import axios from "axios";

export const getAllPosts = async () => await axios.get(`/api/posts`);

export const getSinglePost = async (postId) =>
  await axios.get(`/api/posts/${postId}`);

export const getPostsbyUser = async (username) =>
  await axios.get(`/api/posts/user/${username}`);

//private routes
export const createNewPost = async (token, content, mediaURL, mediaAlt) =>
  await axios.post(
    `/api/posts`,
    { postData: { content, mediaURL, mediaAlt } },
    { headers: { authorization: token } }
  );

export const deletePost = async (token, postId) =>
  await axios.delete(`/api/posts/:${postId}`, {
    headers: { authorization: token },
  });

export const editPost = async (token, postId, content, mediaURL, mediaAlt) =>
  await axios.post(
    `/api/posts/edit/:${postId}`,
    { postData: { content, mediaURL, mediaAlt } },
    {
      headers: { authorization: token },
    }
  );

//like dislike post
export const likePost = async (postId, token) =>
  await axios.post(
    `/api/posts/like/${postId}`,
    {},
    {
      headers: { authorization: token },
    }
  );

export const dislikePost = async (postId, token) =>
  await axios.post(
    `/api/posts/dislike/${postId}`,
    {},
    {
      headers: { authorization: token },
    }
  );
