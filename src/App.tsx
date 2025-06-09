import { useDispatch, useSelector } from "react-redux";
import { logout } from "./redux/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { WithAuth } from "./hoc/withAuth";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import "./App.css";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    document.title = "Blogify - Dashboard";
  }, []);

  const navigations = [
    { name: "View Blogs", path: "/blogs/views" },
    { name: "Create Blog", path: "/blogs/create" },
    { name: "Update Blog", path: "/blogs/update" },
    { name: "Delete Blog", path: "/blogs/delete" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-16 lg:px-32">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome to <span className="text-blue-600">Blogify</span>
          </h1>
          <p className="text-lg text-gray-600">
            A simple yet powerful platform to share your thoughts and ideas.
          </p>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {navigations.map((nav) => (
            <button
              key={nav.name}
              className="w-full px-4 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-md cursor-pointer"
              onClick={() => navigate(nav.path)}
            >
              {nav.name}
            </button>
          ))}
        </motion.div>

        {/* User Info Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white p-6 rounded-2xl shadow-lg max-w-md mx-auto text-center"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Logged in as:
          </h2>
          <p className="text-gray-600">
            {user?.user?.user_metadata?.email || "Unknown User"}
          </p>
        </motion.div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <button
            onClick={() => {
              dispatch(logout());
              navigate("/login");
              toast.success("Logged out successfully");
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-medium shadow-md transition-all"
          >
            Logout
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default WithAuth(App);
