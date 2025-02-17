export const fileToBase64 = async (image: File) => {
  const imgBuffer = await image.arrayBuffer();
  const imageArray = Array.from(new Uint8Array(imgBuffer));
  const imageData = Buffer.from(imageArray);

  // conver to base64
  const imageBase64 = imageData.toString("base64");

  return imageBase64;
};
