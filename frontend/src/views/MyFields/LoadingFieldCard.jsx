import React from 'react';

function LoadingFieldCard() {
  return (
    <div
      className="
        rounded-2xl overflow-hidden bg-white shadow-lg w-64 h-60 flex items-center justify-center text-main transition-all ease-in-out m-auto"
    >
      <div className="w-16 h-16 border-4 border-main border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default LoadingFieldCard;
