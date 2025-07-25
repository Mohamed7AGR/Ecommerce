import React from "react";
import { HashLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <HashLoader color="#00ff89" size={150} />
    </div>
  );
}
