import { PropertyEditForm } from "@/components";
import connectDB from "@/config/db";
import Property from "@/models/Property.model";
import { convertToSerilizableObject } from "@/utils/convertToObject";
import { FC } from "react";

const getProperty = async (id: string) => {
  await connectDB();

  const propertyDoc = await Property.findById(id).lean();

  const property = convertToSerilizableObject(propertyDoc);

  return property;
};

interface pageProps {
  params: Params;
}

type Params = {
  id: string;
};

const page: FC<pageProps> = async ({ params }) => {
  const property = await getProperty(params.id);

  if (!property) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property not found
      </h1>
    );
  }

  return (
    <section className="bg-blue-50 ">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <PropertyEditForm property={property} />
        </div>
      </div>
    </section>
  );
};

export default page;
