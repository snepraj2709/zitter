export const DefaultUserAvatar = "https://picsum.photos/200/300?random=1";

export const ActionTypes = {
  //user actions
  GetAllUsers: "GET_ALL_USERS",
  GetSingleUser: "GET_SINGLE_USER",
  EditUserProfile: "EDIT_USER_PROFILE",
  GetBookmarkPostsByUser: "GET_BOOKMARK_POSTS_BY_USER",
  UpdateBookmark: "UPDATE_BOOKMARK",
  UpdateFollow: "UPDATE_FOLLOW",
  SearchUser: "SEARCH_USER",
  // post actions
  GetAllPosts: "GET_ALL_POSTS",
  GetSinglePost: "GET_SINGLE_POST",
  GetPostsByUser: "GET_POSTS_BY_USER",
  LikePost: "LIKE_POST",
  DislikePost: "DISLIKE_POST",
  CreateNewPost: "CREATE_NEW_POST",
  DeletePost: "DELETE_POST",
  EditPost: "EDIT_POST",
  AddNewComment: "ADD_NEW_COMMENT",
  DeleteComment: "DELETE_COMMENT",
  EditComment: "EDIT_COMMENT",
  FilterPosts: "FILTER_POSTS",
};
