"use server";

import { auth } from "@/auth";
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/db";
import Property from "@/models/Property.model";
import { fileToBase64 } from "@/utils/convertFileToBase64";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addProperty = async (formData: FormData) => {
  await connectDB();
  const session = await auth();

  if (!session?.user || !session.user.id) throw new Error("User is required");

  const { id } = session.user;

  console.log(Object.fromEntries(formData), "server action property");

  const amenities = formData.getAll("amenities");
  const images = formData
    .getAll("images")
    .filter((image: any) => image?.name !== "") as any;

  const propertyData: any = {
    owner: id,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    square_feet: formData.get("square_feet"),
    amenities,
    rates: {
      weekly: formData.get("rates.weekly"),
      monthly: formData.get("rates.monthly"),
      nigthly: formData.get("rates.nigthly"),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
    // images,
  };
  const imageUrls = [];

  for (const image of images) {
    // conver to base64
    const imageBase64 = await fileToBase64(image);

    // make request to cloudinary
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${imageBase64}`,
      {
        folder: "shadow-properties",
      }
    );

    imageUrls.push(result.secure_url);
  }

  propertyData.images = imageUrls;

  const property = new Property(propertyData);
  cloudinary;

  await property.save();
  revalidatePath("/", "layout");
  redirect(`/properties/${property._id}`);
};

export default addProperty;
