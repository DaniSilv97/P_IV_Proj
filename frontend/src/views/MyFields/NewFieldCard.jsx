import React from 'react';
function NewFieldCard() {
  return (
    <div
      className="
        rounded-2xl overflow-hidden bg-white shadow-lg w-64 h-60 flex items-center justify-center text-main transition-all ease-in-out
        hover:text-main-hover hover:translate-x-1 hover:-translate-y-1 hover:shadow-xl"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-32 w-32 transition-colors"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    </div>
  );
}

export default NewFieldCard;