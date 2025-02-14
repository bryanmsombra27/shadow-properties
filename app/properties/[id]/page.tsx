import { FC } from "react";

interface pageProps {
  params: Params;
}

type Params = {
  id: string;
};

const page: FC<pageProps> = async ({ params }) => {
  const { id } = params;
  console.log(id);

  return <h1>Component</h1>;
};

export default page;
