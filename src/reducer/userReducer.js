import { ActionTypes } from "../utils/constants";

const {
  GetAllUsers,
  GetSingleUser,
  EditUserProfile,
  GetBookmarkPostsByUser,
  UpdateBookmark,
  UpdateFollow,
  SearchUser,
} = ActionTypes;

export const initialUserState = {
  allUsers: [],
  bookmarks: [],
  singleUser: {},
  searchInput: "",
};

export const userReducer = (state, { type, payload }) => {
  switch (type) {
    case GetAllUsers:
      return { ...state, allUsers: payload };
    case GetSingleUser:
      return { ...state, singleUser: payload };
    case EditUserProfile:
      return {
        ...state,
        allUsers: state.allUsers.map((user) =>
          user._id === payload._id ? payload : user
        ),
      };
    case UpdateBookmark:
      return { ...state, bookmarks: payload };
    case UpdateFollow:
      return {
        ...state,
        allUsers: state.allUsers.map((user) => {
          const updatedCurrentUser = payload.find(
            ({ _id }) => _id === user._id
          );
          return updatedCurrentUser ? updatedCurrentUser : user;
        }),
      };
    case GetBookmarkPostsByUser:
      return { ...state, bookmarks: payload };
    case SearchUser:
      return { ...state, searchInput: payload };
    default:
      return state;
  }
};
