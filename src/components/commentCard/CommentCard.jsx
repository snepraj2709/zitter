import { UserAvatar } from "../UserAvatar";
import { BsThreeDots } from "../../utils/icons";
import { useNavigate } from "react-router-dom";
import {timeAgo} from '../../utils/timeAgo'

export const CommentCard = ({ comments, user }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {comments?.map(({ _id,commentData, firstName, lastName, username, profileAvatar, createdAt }) => (
        <div key={_id} className="border border-gray-500">
          <div onClick={() => navigate(`/profile/${username}`)} className="flex flex-row justify-between align-middle">
            <div className="flex flex-row m-2 justify-evenly align-middle" onClick={() => navigate(`/profile/${username}`)}>
              <img
          src={profileAvatar}
          alt={firstName}
          className="w-10 h-10 rounded-full object-cover"
        />
              <div className="flex flex-col align-middle ">
                <span>{firstName} {lastName}</span>
                <span>@{username}</span>
              </div>
              <span className="pl-2">{timeAgo(createdAt)}</span>
            </div>
            <BsThreeDots />
          </div>
          <div>
            <p>{commentData}</p>
          </div>
          <br/>
        </div>
      ))}
    </div>
  );
};
