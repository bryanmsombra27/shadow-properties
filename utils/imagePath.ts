export const imagePath = (image: string) => {
  if (image.includes("cloudinary")) {
    return image;
  } else {
    return `/properties/${image}`;
  }
};
