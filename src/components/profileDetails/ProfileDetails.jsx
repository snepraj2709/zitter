import { useState } from 'react';
import { BiArrowBack } from '../../utils/icons';
import { EditProfileModal } from '../../components/editProfileModal/EditProfileModal';
import { useAuth } from '../../context/authContext';
import { useUser } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

export function ProfileDetails({ user, totalPosts }) {
  const { _id, firstName, lastName, username, bio, website, backgroundImage, profileAvatar, createdAt } = user;
  const { loginUser, logoutHandler, token } = useAuth();
  const { followUserHandler, unfollowUserHandler,handleBtnsClick } = useUser();
  const [editProfileModal, setEditProfileModal] = useState(false);

  const navigate=useNavigate();

  const isLoginUserCurrentUser = loginUser.username === user.username;

  const userAlreadyFollowing = user?.followers?.some(
    (user) => user?.username === loginUser?.username
  );

  const createdDate = new Date(createdAt);
  const formattedDate = createdDate.getDate();
  const formattedMonth = createdDate.toLocaleString('default', { month: 'long' });
  const formattedYear = createdDate.getFullYear();

  const editHandler = () => {
    setEditProfileModal(true);
  };

  const closeModal = () => {
    setEditProfileModal(false);
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-row items-center p-4">
        <BiArrowBack className="mr-2 text-lg text-gray-600 cursor-pointer" onClick={()=>navigate(-1)}/>
        <div className="flex flex-col">
          <span className="text-lg font-semibold">{firstName} {lastName}</span>
          <p className="text-gray-500">{totalPosts.length} posts</p>
        </div>
      </div>
      <div>
        <img src={backgroundImage} alt={firstName} className="w-full h-64 object-cover" />
        <div className="flex flex-row justify-between items-center p-4">
          <img src={profileAvatar} className="w-20 h-20 rounded-full object-cover" />
          <div className="flex flex-row">
            {isLoginUserCurrentUser ? (
              <div className="flex">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold p-1 md:py-2 md:px-4 rounded mr-2"
                  onClick={editHandler}
                >
                  Edit Profile
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div>
                {userAlreadyFollowing ? (
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => handleBtnsClick(400, unfollowUserHandler,_id, token)}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => handleBtnsClick(400, followUserHandler,_id, token)}
                  >
                    Follow
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="p-4">
          <p className="text-lg font-semibold">{firstName} {lastName}</p>
          <p className="text-gray-500">@{username}</p>
          <p className="mt-2 text-sm text-gray-700">{bio}</p>
          <a href={website} className="text-blue-500 hover:underline">
            {website}
          </a>
          <p className="text-sm text-gray-600 mt-2">
            {formattedDate} {formattedMonth} {formattedYear}
          </p>
          <div className="flex flex-row justify-start mt-4">
            <span className="mr-4 text-sm text-gray-600">
              {user?.followers.length} Followers
            </span>
            <span className="text-sm text-gray-600">
              {user?.following.length} Following
            </span>
          </div>
        </div>
      </div>
      {isLoginUserCurrentUser && editProfileModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div>
            <EditProfileModal profile={user} onClose={closeModal} />
          </div>
        </div>
      )}
      <hr className="border border-gray-100"/>
    </div>
  );
}
