import Link from "next/link";
import { FC } from "react";
import InfoBox from "./InfoBox";

interface InfoBoxesProps {}
const InfoBoxes: FC<InfoBoxesProps> = ({}) => {
  return (
    <>
      <section>
        <div className="container-xl lg:container m-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
            <InfoBox
              heading="For Renters"
              btnInfo={{
                text: "Browse Properties",
                href: "/properties",
                backgroundColor: "bg-black",
                backgroundColorHover: "bg-gray-700",
              }}
            >
              Find your dream rental property. Bookmark properties and contact
              owners.
            </InfoBox>
            <InfoBox
              btnInfo={{
                href: "/properties/add",
                text: "Add Property",
                backgroundColor: "bg-blue-500",
                backgroundColorHover: "bg-blue-800",
              }}
              heading="For Property Owners"
              background="bg-blue-100"
            >
              List your properties and reach potential tenants. Rent as an
              airbnb or long term.
            </InfoBox>
          </div>
        </div>
      </section>
    </>
  );
};

export default InfoBoxes;
