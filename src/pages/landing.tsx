import { Link } from "react-router-dom";
import bgImg from "../assets/images/img1.jpg";

const LandingPage = () => {
  return (
    <>
      <div className="lg:mt-20 mt-0">
        <p
          className="text-white font-semibold text-[64px]  sm:text-9xl text-center pt-20 tracking-tighter"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Create Your Dream Blog Now.
        </p>

        {/* Tablet image */}
        <img
          src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt="Landing Background"
          className="block md:hidden w-full h-screen object-center absolute top-0 left-0 -z-10"
        />

        {/* Desktop image */}
        <img
          src={bgImg}
          alt="Landing Tablet Background"
          className="hidden md:block w-full h-screen object-center absolute top-0 left-0 -z-10"
        />

        <Link to={"/login"}>
          <button
            className="bg-[#8C1C1C] text-white px-6 py-1  text-lg font-semibold hover:bg-[#8C1C1C]/80 cursor-pointer transition-colors duration-300 flex self-center mx-auto mt-10"
            style={{
              boxShadow: "7px 7px 0 0 rgba(255,255,255)", // solid shadow, 10px right, -5px up, no blur, semi-transparent black
            }}
          >
            Login
          </button>
        </Link>
      </div>
    </>
  );
};

export default LandingPage;
