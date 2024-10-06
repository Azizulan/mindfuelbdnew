import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        {/* Spinner animation */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primeColor"></div>
        {/* Loading text */}
        <p className="mt-4 text-xl text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
