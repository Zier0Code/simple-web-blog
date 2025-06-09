import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import bgImg from "../assets/images/img1.jpg";

const LandingPage = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <img
        src={bgImg}
        alt="Landing Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-white text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight max-w-4xl">
          Create Your Dream Blog Today
        </h1>

        <p className="text-gray-200 mt-4 text-lg sm:text-xl max-w-2xl">
          Blogify helps you publish, share, and grow your voice with a beautiful
          and intuitive blogging experience.
        </p>

        <Link to="/login">
          <button className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-red-600 text-white text-lg font-semibold shadow-lg cursor-pointer hover:bg-red-700 transition duration-300">
            Get Started
            <ArrowRight size={20} />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
