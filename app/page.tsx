import { Hero, HomeProperties, InfoBoxes } from "@/components";
import connectDB from "@/config/db";

export default function Home() {
  connectDB();

  return (
    <>
      <Hero />
      <InfoBoxes />
      <HomeProperties />
    </>
  );
}
