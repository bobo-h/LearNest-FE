export const uploadToCloudinary = async (file: File): Promise<string> => {
  const CLOUDNAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const UPLOADPRESET = process.env.REACT_APP_CLOUDINARY_PRESET;

  if (!CLOUDNAME || !UPLOADPRESET) {
    throw new Error("Cloudinary 설정이 누락되었습니다.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOADPRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDNAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Cloudinary 업로드 실패");
  }

  const data = await response.json();
  return data.secure_url; // 업로드된 이미지의 URL 반환
};
