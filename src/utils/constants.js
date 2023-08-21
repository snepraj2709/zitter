export const DefaultUserAvatar =
  "https://res.cloudinary.com/dqg4mckho/image/upload/v1688744337/Zitter-project-2/profile-pic-5_qowily.jpg";

export const defaulCoverPic =
  "https://res.cloudinary.com/dqg4mckho/image/upload/v1688744950/Zitter-project-2/canva-black-flatlay-photo-motivational-finance-quote-facebook-cover-myVl9DXwcjQ_vqv1pw.jpg";

export const zitterLogo =
  "https://res.cloudinary.com/dqg4mckho/image/upload/v1688745954/Zitter-project-2/zitter-logo_zgqnln.png";

export const defaultWebsite = "https://zitter.netlify.app/";

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
