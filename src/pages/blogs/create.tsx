import { useEffect, useState } from "react";
import { createBlogPost } from "../../api/database";
import { useSelector } from "react-redux";
import { WithAuth } from "../../hoc/withAuth";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const Create = () => {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: any) => state.auth.user);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    authorEmail: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = {
      title: newBlog.title,
      content: newBlog.content,
      author_email: user?.user?.user_metadata?.email || "test@gmail.com",
    };

    try {
      if (!loading) {
        setLoading(true);
        createBlogPost(body)
          .then((res: any) => {
            if (res.ok) {
              toast.success("Blog post created successfully!");
              setNewBlog({ title: "", content: "", authorEmail: "" });
            } else {
              toast.error("Failed:", res.message);
            }
          })
          .catch((err: any) => {
            toast.error("Message: " + err.message);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    } catch (err) {
      toast.error("Error creating blog post:" + err);
    }
  };

  useEffect(() => {
    document.title = "Create Blog Post - Blogify";
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-16">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            <span className="text-blue-600 font-bold">Create</span> Blog Post
          </h1>
          <Link to="/" className="text-blue-600 hover:underline font-medium">
            Home
          </Link>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-2xl shadow-xl"
        >
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-gray-700 font-semibold mb-2"
            >
              Title :
            </label>
            <input
              id="title"
              type="text"
              value={newBlog.title}
              placeholder="Enter blog title"
              onChange={(e) =>
                setNewBlog({ ...newBlog, title: e.target.value })
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="content"
              className="block text-gray-700 font-semibold mb-2"
            >
              Content :
            </label>
            <textarea
              id="content"
              value={newBlog.content}
              placeholder="Write your blog content here..."
              onChange={(e) =>
                setNewBlog({ ...newBlog, content: e.target.value })
              }
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 h-48 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-3 rounded-xl font-semibold text-white transition-all ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Creating..." : "Create Post"}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default WithAuth(Create);
