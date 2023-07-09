// userAPI calls
import axios from "axios";

export const getAllUsers = async () => await axios.get("/api/users");

export const getSingleUserByUserId = async (userId) =>
  await axios.get(`/api/users/${userId}`);

//bookmark post, unbookmark
export const getAllBookmarkPost = async (encodedToken) => {
  console.log(encodedToken);
  try {
    const response = await fetch(`/api/users/bookmark/`, {
      headers: { authorization: encodedToken },
    });
    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

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
  await axios.post(`/api/users/edit`, {
    loginItems: editedDetails,
    headers: { authorization: token },
  });
