const Topbar = () => {
  return (
    <>
      <div className="transition ease-in duration-300 bg-white shadow-md flex justify-start lg:pl-20 sm:pl-20 pl-10 items-center">
        <h1
          className="text-center text-2xl font-bold my-4 tracking-tighter text-gray-800 cursor-pointer hover:text-gray-600 transition-colors duration-300"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Blogify
        </h1>
      </div>
    </>
  );
};

export default Topbar;
