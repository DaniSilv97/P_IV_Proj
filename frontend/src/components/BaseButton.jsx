function BaseLayout({ children }) {
  return (
    <button 
      className="
        text-white 
        bg-main 
        hover:bg-main-hover 
        px-4 
        py-1 
        rounded-full 
        font-medium
        transition-all
        ease-in-out
        shadow-md
        hover:translate-x-[0.1rem]
        hover:-translate-y-[0.1rem]
        hover:shadow-lg
      ">
      { children }
    </button>
  );
}

export default BaseLayout;
