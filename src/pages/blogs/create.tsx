import { useEffect, useState } from "react";
import { createBlogPost } from "../../api/database";
import { useSelector } from "react-redux";
import { WithAuth } from "../../hoc/withAuth";
import { Link } from "react-router-dom";

const create = () => {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: any) => state.auth.user);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    authorEmail: "",
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    type Blog = {
      title: string;
      content: string;
      author_email: string;
    };
    const body: Blog = {
      title: newBlog.title,
      content: newBlog.content,
      author_email: user?.user?.user_metadata?.email || "test@gmail.com",
    };
    try {
      if (!loading) {
        setLoading(true);
        // Simulate API call to create a new blog post
        createBlogPost(body)
          .then((res: any) => {
            if (res.ok) {
              console.log("Blog post created successfully:", res.data);
              alert("Blog post created successfully!");
              setNewBlog({ title: "", content: "", authorEmail: "" });
            } else {
              console.error("Failed to create blog post:", res.message);
            }
          })
          .catch((err: any) => {
            console.error("Error creating blog post:", err);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    } catch (err) {
      console.error("Error creating blog post:", err);
    }
  };

  useEffect(() => {
    document.title = "Create Blog Post - Web Blog";
  }, []);

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold mb-4">Create Blog Posts</h1>
          <Link className="text-blue-600 hover:underline" to={"/"}>
            Home
          </Link>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-md"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              onChange={(e) => {
                setNewBlog((prev) => ({
                  ...prev,
                  title: e.target.value,
                }));
              }}
              value={newBlog.title}
              placeholder="Enter blog title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="content"
            >
              Content
            </label>
            <textarea
              id="content"
              onChange={(e) => {
                setNewBlog((prev) => ({
                  ...prev,
                  content: e.target.value,
                }));
              }}
              value={newBlog.content}
              placeholder="Write your blog content here..."
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
            ></textarea>
          </div>
          <button
            disabled={loading}
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? "Creating..." : "Create Blog Post"}
          </button>
        </form>
      </div>
    </>
  );
};

export default WithAuth(create);
