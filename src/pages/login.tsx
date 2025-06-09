import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser as LoginApi } from "../api/database";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import loginImage from "../assets/images/img3.jpg";

import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const Login = () => {
  useEffect(() => {
    document.title = "Login - Web Blog";
  }, []);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = { email, password };

    try {
      if (!loading) {
        setLoading(true);
        const res = await LoginApi(body);

        if (res.ok) {
          toast.success("Login successful!");
          dispatch(login(res.data));
          navigate("/");
        } else {
          toast.error(res.message || "Login failed.");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="min-h-2/3 w-full bg-gray-100 flex flex-col lg:flex-row items-center justify-center px-6 py-12 relative">
      {/* Image Section */}
      <div className="hidden lg:flex lg:w-1/2 justify-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative w-full max-w-md"
        >
          <img
            src={loginImage}
            alt="Login Visual"
            className="rounded-3xl shadow-2xl object-cover w-full h-full"
          />
          {/* <div className="absolute -bottom-6 -right-6 w-full h-full border-4 border-black rounded-3xl z-[-1]" /> */}
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
          Login
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
            autoFocus
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            maxLength={20}
            minLength={8}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
          />

          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
