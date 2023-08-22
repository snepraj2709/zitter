import { UserAvatar } from "../avatar/UserAvatar";
import { BsThreeDots } from "../../utils/icons";
import { useNavigate } from "react-router-dom";
import {timeAgo} from '../../utils/timeAgo'

export const CommentCard = ({ comments, user }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {comments.length!==0?comments?.map(({ _id,commentData, firstName, lastName, username, profileAvatar, createdAt }) => (
        <div key={_id} className="mt-1 pl-10 shadow-sm">
          <div onClick={() => navigate(`/profile/${username}`)} className="flex flex-row justify-between align-middle">
            <div className="flex flex-row m-1 justify-evenly " onClick={() => navigate(`/profile/${username}`)}>
              <img
                src={profileAvatar}
                alt={firstName}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex flex-col align-middle mx-2">
                <span className="text-sm font-medium">{firstName} {lastName}</span>
                <span className="text-xs text-gray-500">@{username}</span>
              </div>
              <span className="pl-2 text-xs text-gray-500 my-auto">{timeAgo(createdAt)}</span>
            </div>
            <BsThreeDots className="m-4"/>
          </div>
          <div>
            <p className="text-xs">{commentData}</p>
          </div>
          <br/>
        </div>
      )):(<h1 className="text-sm text-center mt-5">No Comments</h1>)}
    </div>
  );
};
