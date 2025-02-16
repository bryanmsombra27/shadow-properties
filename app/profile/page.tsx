import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { FC } from "react";

interface pageProps {}
const page: FC<pageProps> = async ({}) => {
  const session = await auth();

  if (!session) redirect("/");

  return <h1>Component</h1>;
};

export default page;
