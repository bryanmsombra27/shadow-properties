"use server";

import { auth } from "@/auth";
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/db";
import Property from "@/models/Property.model";
import { revalidatePath } from "next/cache";

const deleteProperty = async (propertyId: string) => {
  await connectDB();
  const session = await auth();
  if (!session?.user || !session.user.id) throw new Error("User is required");

  const { id } = session.user;

  const property = await Property.findById(propertyId);

  if (!property) {
    throw new Error("Property not found");
  }

  if (property.owner.toString() !== id.toString()) {
    throw new Error("This user cannot delete this property");
  }

  //   extract public id from images urls
  const publicIds = property.images.map((image: string) => {
    const parts = image.split("/");
    return parts.at(-1)?.split(".").at(0);
  });

  //   delete images from cloudinary
  if (publicIds.length > 0) {
    for (const imageId of publicIds) {
      await cloudinary.uploader.destroy(`shadow-properties/${imageId}`);
    }
  }
  await property.deleteOne();

  revalidatePath("/", "layout");
};

export default deleteProperty;
