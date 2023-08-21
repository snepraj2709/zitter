import { useAuth } from "../../context/authContext";
import { useUser } from "../../context/userContext";
import { UserAvatar } from '../../components/avatar/UserAvatar';
import { useNavigate } from 'react-router-dom';
import {shuffleArray} from '../../utils/shuffleArray'

export const SuggestedUser = () => {
  const { userState: { allUsers },followUserHandler, handleBtnsClick} = useUser();
  const { loginUser,token } = useAuth();
  const navigate = useNavigate();

  const usersNotFollowedByLoginUser = allUsers.filter((user) => {
  return user.username !== loginUser.username && !user.followers.some((follower) => follower.username === loginUser.username);
});

const suggestedUsers=shuffleArray(usersNotFollowedByLoginUser)

  return (
    <div className="sticky top-0 m-3">
      <h1 className="flex flex-col font-bold text-xl p-2">Suggested User</h1>
      <div>
        {suggestedUsers?.length > 0 ? (
          suggestedUsers?.map((user) => (
            <div
              key={user?.id}
              className=" flex flex-row items-left justify-between m-1 align-items: center text-white p-2 cursor-pointer w-64 rounded border shadow shadow-blue-300/30 "
            >
              <div className="flex flex-row" onClick={() => {
                navigate(`/profile/${user?.username}`);
              }}>
                <UserAvatar user={user} />
                <div className="ml-2 flex flex-col text-left">
                  <span className="font-medium text-base text-gray-800">{user?.firstName + " " + user?.lastName}</span>
                  <span className="text-sm text-gray-800">{user?.username}</span>
                </div>
              </div>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded-lg h-10 mr-2 shadow shadow-blue-500/40 hover:shadow-indigo-500/40" onClick={()=>handleBtnsClick(400, followUserHandler, user?._id,token)}>
                    Follow
                  </button>
            </div>
          ))
        ) : (
          <h1 className="font-medium text-lg text-center mt-10">Oops! No user found</h1>
        )}
      </div>
    </div>
  );
};
