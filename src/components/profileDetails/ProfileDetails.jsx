import { useState } from 'react';
import { useUser } from '../../context/userContext';
import { BiArrowBack } from '../../utils/icons';
import {EditProfileModal} from '../../components/editProfileModal/EditProfileModal'

export function ProfileDetails({ user, totalPosts }) {
  const { firstName, lastName, username, bio, website, backgroundImage,profileAvatar, createdAt } = user;
  const [editProfileModal,setEditProfileModal]=useState(false);
  const {isLoading,editUserDetailHandler,userDispatch,userState}=useUser();

  const createdDate = new Date(createdAt);
  const formattedDate = createdDate.getDate();
  const formattedMonth = createdDate.toLocaleString('default', { month: 'long' });
  const formattedYear = createdDate.getFullYear();

  const editHandler =()=>{
    setEditProfileModal(true)
  }

  const closeModal=()=>{
    setEditProfileModal(false)
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-row items-center p-4">
        <BiArrowBack className="mr-2" />
        <div className="flex flex-col">
          <span className="text-lg font-semibold">{firstName} {lastName}</span>
          <p className="text-gray-500">{totalPosts.length} posts</p>
        </div>
      </div>
      <div>
        <img src={backgroundImage} alt={firstName} className="w-full h-64 object-cover" />
        <div className="flex flex-row justify-between items-center p-4">
          <img src={profileAvatar} className='w-20 h-20 rounded-full object-cover'/>
          <div className="flex flex-row">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2" onClick={editHandler}>
              Edit profile
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
              Logout
            </button>
          </div>
        </div>
        <div className="p-4">
          <p className="text-lg font-semibold">{firstName} {lastName}</p>
          <p className="text-gray-500">@{username}</p>
          <p className="mt-2">{bio}</p>
          <a href={website} className="text-blue-500 hover:underline">{website}</a>
          <p>{formattedDate} {formattedMonth} {formattedYear}</p>
        </div>
      </div>
      {
        editProfileModal && <div>
            <EditProfileModal profile={user} onClose={closeModal}/>
        </div>
      }
    </div>
  );
}
