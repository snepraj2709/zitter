import { useUser } from "../../context/userContext";
import { ActionTypes } from "../../utils/constants";
import { MdCancel } from "../../utils/icons";
import { useAuth } from "../../context/authContext";
import { useState } from 'react';

export function EditProfileModal({ profile, onClose }) {
  const { isLoading, editUserDetailHandler, userState, userDispatch } = useUser();
  const { SearchUser } = ActionTypes;
  const { token } = useAuth();
  const [editedDetails, setEditedUserDetail] = useState(profile);

  const handleChange = (e) => {
    setEditedUserDetail({
      ...editedDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    editUserDetailHandler(editedDetails, token);
    console.log('editedDetails in modal on submit', editedDetails);
    onClose();
  };

  return (
    <div className="bg-gray-200 w-56 rounded items-center p-4 shadow-md">
      <div className="flex flex-row justify-between">
        <MdCancel onClick={onClose} className="w-6 h-6 cursor-pointer text-gray-500" />
        <span className="font-medium text-gray-700">Edit Profile</span>
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        <button
          onClick={(e) => handleSubmit(e)}
          className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 focus:outline-none"
        >
          Save
        </button>

        <label className="block mt-4">
          <span className="text-gray-700">First Name:</span>
          <input
            type="text"
            name="firstName"
            value={editedDetails.firstName}
            onChange={handleChange}
            className="block w-full border-gray-300 border rounded-md mt-1 px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </label>

        <label className="block mt-4">
          <span className="text-gray-700">Last Name:</span>
          <input
            type="text"
            name="lastName"
            value={editedDetails.lastName}
            onChange={handleChange}
            className="block w-full border-gray-300 border rounded-md mt-1 px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </label>

        <label className="block mt-4">
          <span className="text-gray-700">Bio:</span>
          <input
            type="text"
            name="bio"
            value={editedDetails.bio}
            onChange={handleChange}
            className="block w-full border-gray-300 border rounded-md mt-1 px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </label>

        <label className="block mt-4">
          <span className="text-gray-700">Website:</span>
          <input
            type="text"
            name="website"
            value={editedDetails.website}
            onChange={handleChange}
            className="block w-full border-gray-300 border rounded-md mt-1 px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </label>
      </form>
    </div>
  );
}
