import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { FC } from "react";
import ProfileDefault from "@/assets/images/profile.png";
import connectDB from "@/config/db";
import Property from "@/models/Property.model";
import { ProfileProperties } from "@/components";
import { convertToSerilizableObject } from "@/utils/convertToObject";

const getProperties = async (id: string) => {
  await connectDB();
  const propertiesDocs = await Property.find({
    owner: id,
    // })
  }).lean();

  const properties = propertiesDocs.map((property) =>
    convertToSerilizableObject(property)
  );

  return properties;
};

interface pageProps {}
const page: FC<pageProps> = async ({}) => {
  const session = await auth();

  if (!session) redirect("/");

  const { user } = session;

  if (!user) {
    throw new Error(`User not found`);
  }
  const properties = await getProperties(user.id!);

  return (
    <>
      <section className="bg-blue-50">
        <div className="container m-auto py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 mx-20 mt-10">
                <div className="mb-4">
                  <Image
                    className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                    width={200}
                    height={200}
                    src={user?.image || ProfileDefault}
                    alt="profile image"
                  />
                </div>

                <h2 className="text-2xl mb-4">
                  <span className="font-bold block">Name: </span> {user?.name}
                </h2>
                <h2 className="text-2xl">
                  <span className="font-bold block">Email: </span> {user?.email}
                </h2>
              </div>

              <div className="md:w-3/4 md:pl-4">
                <h2 className="text-xl font-semibold mb-4">Your Listings</h2>

                <ProfileProperties properties={properties} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
