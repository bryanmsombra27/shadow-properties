import connectDB from "@/config/db";
import Property from "@/models/Property.model";
import { FC } from "react";
import { Property as PropertyInterface } from "@/interfaces/property";
import { PropertyDetails, PropertyHeaderImage } from "@/components";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const getProperty = async (id: string) => {
  await connectDB();
  const property = await Property.findById(id);

  return property as PropertyInterface;
};

interface pageProps {
  params: Params;
}

type Params = {
  id: string;
};

const page: FC<pageProps> = async ({ params }) => {
  const { id } = await params;
  const property = await getProperty(id);

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowAltCircleLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </section>

      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            {/* property info */}
            <PropertyDetails property={property} />
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
