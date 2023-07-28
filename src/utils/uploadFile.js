const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dqg4mckho/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "zitter";

export const uploadFile = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", "zitter");
  try {
    const response = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    // throw error;
  }
};
