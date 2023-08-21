import { UserAvatar } from '../avatar/UserAvatar';
import { useUser } from '../../context/userContext';
import { usePost } from '../../context/postContext';
import { FcLike, FiHeart, BiSolidBookmark, BsBookmark, FaComment, BsThreeDots } from '../../utils/icons';
import { timeAgo } from '../../utils/timeAgo';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

export function PostCard({ post }) {
  const { _id, content, mediaURL, mediaAlt, username, likes, comments, createdAt } = post;

  const { loginUser, token } = useAuth();
  const { userState: { allUsers }, addBookmarkHandler, removeBookmarkHandler, postAlreadyBookmarked } = useUser();
  const { deletePostHandler, editPostHandler, fetchSinglePost, likePostHandler, dislikePostHandler, postLikedByLoggedUser } = usePost();
  const time = timeAgo(createdAt);
  const navigate = useNavigate();
  const postByUser = allUsers?.find((user) => user.username === username);

  return (
    <div className="flex flex-col shadow-sm p-2 md:p-4 cursor-pointer min-w-full">
      <div>
        <div onClick={() => navigate(`/profile/${postByUser.username}`)} className='flex flex-row justify-between items-center'>
          <div className='flex flex-row m-2 items-center' onClick={() => navigate(`/profile/${username}`)}>
            <UserAvatar user={postByUser} />
            <div className='flex flex-col ml-2 '>
              <span className="text-base font-medium">{postByUser?.firstName} {postByUser?.lastName}</span>
              <span className="text-sm text-gray-500">@{postByUser?.username}</span>
            </div>
            <span className="text-sm text-gray-500 ml-2">{time}</span>
          </div>
          <BsThreeDots className='w-6 h-6 justify-center p-1' />
        </div>

        <div className="flex flex-col justify-start mt-4 ml-10 py-3">
          <div
            onClick={() => {
              fetchSinglePost(_id);
              navigate(`/post/${_id}`);
            }}
            className='flex flex-col items-start' 
          >
            <img src={mediaURL} alt={mediaAlt} className="w-full h-auto object-contain" />
            <p className="text-md font-normal mt-2 break-all">{content}</p>
          </div>
          <div className='flex flex-row justify-between mt-4'>
            <div className='flex flex-row items-center'>
              {postLikedByLoggedUser(loginUser, post) ? (
                <FcLike onClick={() => dislikePostHandler(_id, token)} className="mr-1 w-5 h-5"/>
              ) : (
                <FiHeart onClick={() => likePostHandler(_id, token)} className="mr-1 w-5 h-5" />
              )}
              <span className="text-sm font-medium ml-1">{likes?.likeCount > 0 && likes?.likeCount}</span>
            </div>
            <div className='flex flex-row items-center'>
              <FaComment className="mr-1 w-5 h-5" />
              <span className="text-sm font-medium">{comments?.length}</span>
            </div>
            <div className='flex flex-row items-center'>
              {postAlreadyBookmarked(_id) ? (
                <BiSolidBookmark onClick={() => removeBookmarkHandler(_id, token)} className="mr-1 w-5 h-5"/>
              ) : (
                <BsBookmark onClick={() => addBookmarkHandler(_id, token)} className="mr-1 w-5 h-5"/>
              )}
            </div>
          </div>
        </div>
        <hr className="border-gray-300"/>
      </div>
      
    </div>
  );
}
