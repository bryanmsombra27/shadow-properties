import { FC } from "react";
import properties from "@/data/properties.json";
import { PropertyCard } from "@/components";

interface pageProps {}
const page: FC<pageProps> = ({}) => {
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length == 0 ? (
          <p>No properties Found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default page;
