"use client";
import { FC } from "react";
import { ClipLoader } from "react-spinners";
interface loadingProps {}

const override: React.CSSProperties = {
  display: "block",
  margin: "100px auto",
};

const loading: FC<loadingProps> = ({}) => {
  return (
    <ClipLoader
      color="#3b82f6"
      cssOverride={override}
      size={150}
      aria-label="loading spinner"
    />
  );
};

export default loading;
