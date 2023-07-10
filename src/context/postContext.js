import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import { ActionTypes } from "../utils/constants";
import { postInitialState, postReducer } from "../reducer/postReducer";
import {
  getAllPosts,
  getSinglePost,
  getPostsbyUser,
  createNewPost,
  deletePost,
  editPost,
  likePost,
  dislikePost,
} from "../services/postServices";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    GetAllPosts,
    GetSinglePost,
    GetPostsByUser,
    LikePost,
    DislikePost,
    CreateNewPost,
    DeletePost,
    EditPost,
  } = ActionTypes;

  const [postState, postDispatch] = useReducer(postReducer, postInitialState);

  const fetchAllPosts = async () => {
    setIsLoading(true);
    try {
      const { status, data } = await getAllPosts();
      if (status === 200 || status === 201) {
        postDispatch({ type: GetAllPosts, payload: data.posts });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSinglePost = async (postId) => {
    try {
      const { status, data } = await getSinglePost(postId);
      if (status === 200 || status === 201) {
        postDispatch({ type: GetSinglePost, payload: data.post });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const createNewPostHandler = async (
    token,
    { content, mediaURL, mediaAlt }
  ) => {
    setIsLoading(true);
    try {
      const { status, data } = await createNewPost(
        token,
        content,
        mediaURL,
        mediaAlt
      );
      if (status === 200 || status === 201) {
        postDispatch({ type: CreateNewPost, payload: data.posts });
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong, try again!");
    } finally {
      setIsLoading(false);
    }
  };

  const deletePostHandler = async (token, postId) => {
    try {
      const { status, data } = await deletePost(token, postId);
      if (status === 200 || status === 201) {
        postDispatch({ type: DeletePost, payload: data.posts });
        toast.success("Post deleted successfully!");
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong, try again!");
    }
  };

  const editPostHandler = async (
    postId,
    token,
    { content, mediaURL, mediaAlt }
  ) => {
    try {
      const { status, data } = await editPost(
        postId,
        token,
        content,
        mediaURL,
        mediaAlt
      );
      if (status === 200 || status === 201) {
        postDispatch({ type: EditPost, payload: data.posts });
        toast.success("Post edited successfully!");
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong, try again!");
    }
  };

  const likePostHandler = async (postId, token) => {
    try {
      const { status, data } = await likePost(postId, token);
      if (status === 200 || status === 201) {
        postDispatch({ type: LikePost, payload: data.posts });
        toast.success("Post liked");
      }
    } catch (error) {
      const {
        response: { status },
      } = error;
      if (status === 400) {
        toast.error("Cannot like a post that is already liked.");
      } else {
        console.log(error);
        toast.error("Something went wrong! Try again");
      }
    }
  };

  const dislikePostHandler = async (postId, token) => {
    try {
      const { status, data } = await dislikePost(postId, token);
      if (status === 200 || status === 201) {
        postDispatch({ type: DislikePost, payload: data.posts });
        toast.success("Removed like from Post");
      }
    } catch (error) {
      const {
        response: { status },
      } = error;
      if (status === 400) {
        toast.error("Cannot decrement like anymore");
      } else {
        console.log(error);
        toast.error("Something went wrong! Try again");
      }
    }
  };

  const fetchAllPostsByUser = async (username) => {
    try {
      const { status, data } = await getPostsbyUser(username);
      if (status === 200 || status === 201) {
        postDispatch({ type: GetPostsByUser, payload: data.posts });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const postLikedByLoggedUser = (user, post) => {
    return post?.likes?.likedBy?.find(
      (likedUser) => likedUser.username === user.username
    );
  };

  const filterPostHandler = async (filteredPosts, filterType) => {
    try {
      //console.log("filteredPosts", filteredPosts, "filterType", filterType);
      postDispatch({
        type: FilterPosts,
        payload: { filteredPosts: filteredPosts, filterType: filterType },
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchAllPosts();
    //getAllPosts()
  }, []);

  return (
    <PostContext.Provider
      value={{
        isLoading,
        postState,
        postDispatch,
        fetchSinglePost,
        createNewPostHandler,
        deletePostHandler,
        editPostHandler,
        likePostHandler,
        dislikePostHandler,
        fetchAllPostsByUser,
        postLikedByLoggedUser,
        filterPostHandler,
      }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => useContext(PostContext);
