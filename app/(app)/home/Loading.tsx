"use client";
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4 text-lg text-primary font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
