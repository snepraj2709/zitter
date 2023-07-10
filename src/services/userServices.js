// userAPI calls
import axios from "axios";

export const getAllUsers = async () => await axios.get("/api/users");

export const getSingleUserByUserId = async (userId) =>
  await axios.get(`/api/users/${userId}`);

//bookmark post, unbookmark

export const getAllBookmarkPost = async (encodedToken) =>
  axios.get("/api/users/bookmark", {
    headers: { authorization: encodedToken },
  });

export const addBookmark = async (postId, token) =>
  await axios.post(
    `/api/users/bookmark/${postId}`,
    {},
    {
      headers: { authorization: token },
    }
  );

export const removeBookmark = async (postId, token) =>
  await axios.post(
    `/api/users/remove-bookmark/${postId}`,
    {},
    {
      headers: { authorization: token },
    }
  );

//follow unfollow routes
export const followUserService = async (followUserId, token) =>
  await axios.post(
    `/api/users/follow/${followUserId}`,
    {},
    {
      headers: { authorization: token },
    }
  );

export const unfollowUserService = async (followUserId, token) =>
  await axios.post(
    `/api/users/unfollow/${followUserId}`,
    {},
    {
      headers: { authorization: token },
    }
  );

export const editUserProfile = async (editedDetails, token) =>
  await axios.post(
    "/api/users/edit",
    { userData: editedDetails },
    { headers: { authorization: token } }
  );
