import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser as registerAPI } from "../api/database";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import registerImage from "../assets/images/register1.jpg";

import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const Register = () => {
  useEffect(() => {
    document.title = "Register - Web Blog";
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = { email, password };

    try {
      if (!loading) {
        setLoading(true);
        const res = await registerAPI(body);

        if (res.ok) {
          toast.success("Registration successful!");
          dispatch(login(res.data));
          navigate("/");
        } else {
          toast.error(res.message || "Registration failed.");
        }
      }
    } catch (err) {
      console.error("Registration error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="min-h-2/3 w-full bg-gray-100 flex flex-col lg:flex-row items-center justify-center px-6 py-12 overflow-hidden">
      {/* Image Section */}
      <div className="hidden lg:flex lg:w-1/2 justify-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full max-w-md"
        >
          <img
            src={registerImage}
            alt="Register Visual"
            className="rounded-3xl object-cover w-full h-full"
          />
          {/* <div className="absolute -bottom-6 -right-6 w-full h-full bg-black/20 rounded-3xl z-[-1]" /> */}
        </motion.div>
      </div>

      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Register
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            maxLength={20}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
          />

          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold transition-all ${
              loading
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-900"
            }`}
          >
            {loading ? "Registering..." : "Submit"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
