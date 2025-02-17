"use server";

import { auth } from "@/auth";
import connectDB from "@/config/db";
import Property from "@/models/Property.model";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const editProperty = async (propertyId: string, formData: FormData) => {
  await connectDB();
  const session = await auth();

  if (!session?.user || !session.user.id) throw new Error("User is required");

  const { id } = session.user;

  const existProperty = await Property.findById(propertyId);

  if (!existProperty) throw new Error("Property not found");

  if (existProperty.owner.toString() !== id.toString())
    throw new Error(
      "This property does not belong to the user, for that reason it can not be updated"
    );
  const amenities = formData.getAll("amenities");
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

  const updatedProperty = await Property.findByIdAndUpdate(
    propertyId,
    propertyData
  );

  revalidatePath("/", "layout");
  redirect(`/properties/${updatedProperty._id}`);
};

export default editProperty;
