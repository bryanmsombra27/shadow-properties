import Image from "next/image";
import { FC } from "react";

interface PropertyHeaderImageProps {
  image: string;
}
const PropertyHeaderImage: FC<PropertyHeaderImageProps> = ({ image }) => {
  return (
    <>
      <section>
        <div className="container-xl m-auto">
          <div className="grid grid-cols-1">
            <Image
              src={`/properties/${image}`}
              alt={`Property Image ${image}`}
              className="object-cover h-[400px] w-full"
              width={0}
              height={0}
              sizes="100vw"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyHeaderImage;
