"use client";

import deleteProperty from "@/actions/deleteProperty";
import { Property } from "@/interfaces/property";
import { imagePath } from "@/utils/imagePath";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import { toast } from "react-toastify";

interface ProfilePropertiesProps {
  properties: Property[];
}
const ProfileProperties: FC<ProfilePropertiesProps> = ({
  properties: initialProperties,
}) => {
  const [properties, setProperties] = useState<Property[]>(initialProperties);

  const handleDeleteProperty = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmed) return;

    await deleteProperty(id);

    const updatedProperties = properties.filter(
      (property) => property._id !== id
    );

    setProperties(updatedProperties);

    toast.success("Property was deleted successfully!");
  };

  return properties.map((property) => (
    <div
      className="mb-10"
      key={property._id}
    >
      <a href={`/properties/${property._id}`}>
        <Image
          className="h-32 w-full rounded-md object-cover"
          src={imagePath(property.images[0])}
          alt={`Property ${property.name}`}
          width={200}
          height={200}
        />
      </a>
      <div className="mt-2">
        <p className="text-lg font-semibold">{property.name}</p>
        <p className="text-gray-600">
          Address:{property.location.street},{property.location.city}{" "}
          {property.location.state} {property.location.zipcode}{" "}
        </p>
      </div>
      <div className="mt-2">
        <Link
          href={`/properties/${property._id}/edit`}
          className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
        >
          Edit
        </Link>
        <button
          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
          type="button"
          onClick={() => handleDeleteProperty(property._id)}
        >
          Delete
        </button>
      </div>
    </div>
  ));
};

export default ProfileProperties;
