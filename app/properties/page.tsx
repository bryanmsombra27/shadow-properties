import { FC } from "react";
import { PropertyCard } from "@/components";
import connectDB from "@/config/db";
import Property from "@/models/Property.model";
import { Property as PropertyInterface } from "@/interfaces/property";

const getProperties = async () => {
  await connectDB();

  // SE UTILIZA EL METODO LEAN PARA OBTENER LOS DATOS COMO OBJETOS DE LECTURA DE JS EVITANDO QUE SEAN OBJETOS DE MONGOOSE QUE NO SE PUEDEN MODIFICAR
  const properties = (await Property.find()) as PropertyInterface[];

  return properties;
};

interface pageProps {}
const page: FC<pageProps> = async ({}) => {
  const properties = await getProperties();

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
