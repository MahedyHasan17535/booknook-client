// upload a book image to imgbb and return the image url
export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    },
  );
  const data = await res.json();

  if (!res.ok || !data?.data?.display_url) {
    throw new Error("Image upload failed. Please try another image.");
  }

  return data.data.display_url as string;
};
