import { useAuth } from "../../context/authContext";
import { usePost } from "../../context/postContext";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { UploadWidget, uploadFile } from "../../utils/uploadImageToCloudinary";
import { MdCancel } from "../../utils/icons";

export const NewPostModal = ({ onClose }) => {
  const { token } = useAuth();
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
      console.log("response", response);
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
  };
  return (
    <div className="fixed top-0 left-0  w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50 z-200">
      <div className="absolute bg-white px-4 rounded-md">
        <div className="flex flex-col ">
          <button onClick={onClose} className=" h-5 relative my-1">
            <MdCancel className="w-5 h-5 cursor-pointer absolute top-0 right-0" />
          </button>

          <textarea
            placeholder="Whats happening!"
            value={newPostDetails?.content}
            className="border border-gray-800"
            rows={2}
            onChange={(e) =>
              setNewPostDetails({ ...newPostDetails, content: e.target.value })
            }
          />
          <div className="flex flex-row justify-end items-center py-2">
            <UploadWidget />
            <button
              className="flex items-center px-5 ml-3 h-8 bg-blue-500 text-white rounded-md"
              onClick={(e) => submitPostHandler(e)}>
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
