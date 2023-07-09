import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import { userReducer, initialUserState } from "../reducer/userReducer";
import { ActionTypes } from "../utils/constants";
import {
  getAllUsers,
  getSingleUserByUserId,
  editUserProfile,
  getAllBookmarkPost,
  addBookmark,
  removeBookmark,
  followUserService,
  unfollowUserService,
} from "../services/userServices";
import { useAuth } from "./authContext";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { loginItems, setLoginItems, token } = useAuth();

  const {
    GetAllUsers,
    GetSingleUserByUserId,
    EditUserProfile,
    GetBookmarkPostsByUser,
    UpdateBookmark,
    UpdateFollow,
  } = ActionTypes;

  const [userState, userDispatch] = useReducer(userReducer, initialUserState);

  const fetchAllUsersData = async () => {
    setIsLoading(true);
    try {
      const { status, data } = await getAllUsers();
      if (status === 200 || status === 201) {
        userDispatch({ type: GetAllUsers, payload: data.users });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSingleUser = async (username) => {
    try {
      const { status, data } = await getSingleUserByUserId(username);
      if (status === 200 || status === 201) {
        userDispatch({ type: GetSingleUserByUserId, payload: data.user });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const editUserDetailHandler = async (editedDetails, token) => {
    setIsLoading(true);
    try {
      const { status, data } = await editUserProfile(editedDetails, token);
      if (status === 200 || status === 201) {
        userDispatch({ type: EditUserProfile, payload: data.user });
        setLoginItems({ ...loginItems, loginUser: data.user });
        toast.success("Updated profile successfully!");
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBookmarkPosts = async (token) => {
    try {
      const { status, data } = await getAllBookmarkPost(token);
      console.log("data from fetchBookmarkPosts", data);
      if (status === 200 || status === 201) {
        userDispatch({ type: GetBookmarkPostsByUser, payload: data.bookmarks });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const addBookmarkHandler = async (postId, token) => {
    try {
      const { status, data } = await addBookmark(postId, token);
      if (status === 200 || status === 201) {
        userDispatch({ type: UpdateBookmark, payload: data.bookmarks });
        toast.success("Added to bookmarks.");
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong!");
    }
  };

  const removeBookmarkHandler = async (postId, token) => {
    try {
      const { status, data } = await removeBookmark(postId, token);
      if (status === 200 || status === 201) {
        userDispatch({ type: UpdateBookmark, payload: data.bookmarks });
        toast.success("Removed from bookmarks.");
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong!");
    }
  };

  const followUserHandler = async (followUserId, token) => {
    setIsLoading(true);
    try {
      const {
        status,
        data: { followUser, user },
      } = await followUserService(followUserId, token);
      if (status === 200 || status === 201) {
        userDispatch({ type: UpdateFollow, payload: [followUser, user] });
        setLoginItems({ ...loginItems, loginUser: user });
        toast.success(`Followed ${followUser.firstName}`);
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const unfollowUserHandler = async (followUserId, token) => {
    setIsLoading(true);
    try {
      const {
        status,
        data: { followUser, user },
      } = await unfollowUserService(followUserId, token);
      if (status === 200 || status === 201) {
        userDispatch({ type: UpdateFollow, payload: [followUser, user] });
        setLoginItems({ ...loginItems, loginUser: user });
        toast.success(`Unfollowed ${followUser.firstName}`);
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const searchedUsers =
    userState.searchInput &&
    userState.allUsers?.filter((user) =>
      user.username.toLowerCase().includes(userState.searchInput.toLowerCase())
    );

  const postAlreadyBookmarked = (postId) =>
    userState?.bookmarks?.find((id) => id === postId);

  useEffect(() => {
    fetchAllUsersData();
    if (token) {
      fetchBookmarkPosts();
    }
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        isLoading,
        userState,
        userDispatch,
        fetchAllUsersData,
        fetchSingleUser,
        editUserDetailHandler,
        fetchBookmarkPosts,
        addBookmarkHandler,
        removeBookmarkHandler,
        followUserHandler,
        unfollowUserHandler,
        searchedUsers,
        postAlreadyBookmarked,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
