import { ActionTypes } from "../utils/constants";

const {
  GetAllPosts,
  GetSinglePost,
  GetPostsByUser,
  LikePost,
  DislikePost,
  CreateNewPost,
  DeletePost,
  EditPost,
  FilterPosts,
} = ActionTypes;

export const postInitialState = {
  allPosts: [],
  postByUser: [],
  singlePost: {},
  filterType: "trending",
};

export const postReducer = (state, { type, payload }) => {
  switch (type) {
    case GetAllPosts:
      return { ...state, allPosts: payload };
    case GetSinglePost:
      return { ...state, singlePost: payload };
    case GetPostsByUser:
      return { ...state, postByUser: payload };
    case LikePost:
      return { ...state, allPosts: payload };
    case DislikePost:
      return { ...state, allPosts: payload };
    case CreateNewPost:
      return { ...state, allPosts: payload };
    case DeletePost:
      return { ...state, allPosts: payload };
    case EditPost:
      return { ...state, allPosts: payload };
    case FilterPosts:
      return {
        ...state,
        allPosts: payload?.filteredPosts,
        filterType: payload?.filterType,
      };
    default:
      return state;
  }
};
