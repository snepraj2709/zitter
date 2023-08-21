import { useAuth } from "../../context/authContext";
import { usePost } from "../../context/postContext";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { uploadFile } from "../../utils/uploadFile";
import { MdCancel } from "../../utils/icons";
import { BiSolidImageAdd } from "../../utils/icons";
import { UserAvatar } from "../avatar/UserAvatar";

export const NewPostModal = ({ onClose }) => {
  const { loginUser, token } = useAuth();
  const { createNewPostHandler } = usePost();
  const [newPostDetails, setNewPostDetails] = useState({
    content: "",
    mediaURL: "",
    mediaAlt: "",
  });

  const submitPostHandler = async (e) => {
    e.preventDefault();
    const newPostToast = toast.loading("Creating new Post!");

    let imageFile = newPostDetails.mediaURL;

    if (newPostDetails.mediaURL) {
      const response = await uploadFile(imageFile);
      createNewPostHandler(token, {
        ...newPostDetails,
        mediaURL: response.url,
        mediaAlt: response.original_filename,
      });
    } else {
      createNewPostHandler(token, newPostDetails);
    }
    toast.success("Added new post successfully", { id: newPostToast });
    setNewPostDetails({ content: "", mediaURL: "", mediaAlt: "" });
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50 z-200">
      <div className="flex flex-col bg-white rounded-md p-3">
        <UserAvatar user={loginUser} />
        <div className="flex flex-col m-2 ">
          <div className="flex flex-col flex-wrap flex-grow">
            <textarea
              placeholder="Whats happening!"
              value={newPostDetails?.content}
              className="p-2 border-none outline-none"
              rows={1}
              onChange={(e) =>
                setNewPostDetails({
                  ...newPostDetails,
                  content: e.target.value,
                })
              }
            />
            {newPostDetails?.mediaURL && (
              <div className="relative">
                {newPostDetails.mediaURL?.type?.includes("video") ? (
                  <div className="absolute">
                    <video controls className="w-full rounded-md">
                      <source
                        src={URL.createObjectURL(newPostDetails.mediaURL)}
                        type="video/mp4"
                      />
                    </video>
                  </div>
                ) : (
                  <div className="absolute rounded-md">
                    <img
                      src={URL.createObjectURL(newPostDetails.mediaURL)}
                      alt={newPostDetails.mediaAlt}
                      className="rounded-md w-full h-full"
                    />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() =>
                    setNewPostDetails({ ...newPostDetails, mediaURL: null })
                  }
                  className="absolute top-1.5 left-2">
                  <MdCancel className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-row justify-end items-center py-2">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*, video/*"
                className="hidden"
                onChange={(e) =>
                  setNewPostDetails({
                    ...newPostDetails,
                    mediaURL: e.target.files[0],
                  })
                }
              />
              <BiSolidImageAdd className="w-8 h-8" />
            </label>

            <button
              className="flex items-center px-5 ml-3 h-8 bg-blue-500 text-white rounded-md"
              onClick={(e) => submitPostHandler(e)}>
              Post
            </button>
            <button
              onClick={onClose}
              className="px-5 ml-3 h-8 border border-gray-300">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
