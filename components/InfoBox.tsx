import Link from "next/link";
import { FC, ReactNode } from "react";

interface InfoBoxProps {
  children: ReactNode;
  heading: string;
  background?: string;
  textColor?: string;
  btnInfo: BtnInfo;
}

interface BtnInfo {
  text: string;
  href: string;
  backgroundColor?: string;
  backgroundColorHover: string;
}

const InfoBox: FC<InfoBoxProps> = ({
  children,
  heading,
  background = "bg-gray-100",
  textColor = "text-gray-800",
  btnInfo,
}) => {
  return (
    <>
      <div className={`${background} p-6 rounded-lg shadow-md  `}>
        <h2 className={`text-2xl font-bold ${textColor}`}>{heading}</h2>
        <p className={`mt-2 mb-4 ${textColor}`}>{children}</p>
        <Link
          href={btnInfo.href}
          className={`${btnInfo.backgroundColor} inline-block  text-white rounded-lg px-4 py-2 hover:${btnInfo.backgroundColorHover}`}
        >
          {btnInfo.text}
        </Link>
      </div>
    </>
  );
};

export default InfoBox;
