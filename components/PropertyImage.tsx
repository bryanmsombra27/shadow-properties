import { imagePath } from "@/utils/imagePath";
import Image from "next/image";
import { FC } from "react";

interface PropertyImageProps {
  images: string[];
}
const PropertyImage: FC<PropertyImageProps> = ({ images }) => {
  return (
    <section className="bg-blue-50 p-4 ">
      <div className="container mx-auto">
        {images.length == 1 ? (
          <Image
            className="object-cover h-[400px] mx-auto rounded-xl"
            src={imagePath(images[0])}
            alt={`building ${images[0]}`}
            width={1800}
            height={400}
            priority
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div
                className={
                  images.length == 3 && index == 2 ? "col-span-2" : "col-span-1"
                }
                key={index}
              >
                <Image
                  className="object-cover h-[400px] mx-auto rounded-xl"
                  src={imagePath(image)}
                  alt={`building ${image}`}
                  width={1800}
                  height={400}
                  priority
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyImage;
