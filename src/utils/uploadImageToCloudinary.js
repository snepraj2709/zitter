const CloudinaryUrl = "";

export async function uploadImageToCloudinary(imageFile, CloudinaryUrl) {
  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "zitter");
  formData.append("folder", "Zitter-project-2");

  return fetch(CloudinaryUrl, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => console.error(err));
}
