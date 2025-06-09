import { useEffect, useState, useMemo } from "react";
import { getBlogPosts, updateBlogPost } from "../../api/database";
import { WithAuth } from "../../hoc/withAuth";
import { Link } from "react-router-dom";
import { Calendar, Clock, Edit2, FileText } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const POSTS_PER_PAGE = 6;

const UpdateBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updatePostId, setUpdatePostId] = useState<number>(0);
  const [updateBlog, setUpdateBlog] = useState({ title: "", content: "" });
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Update Blog Posts - Blogify";
  }, []);

  const totalPages = useMemo(
    () => Math.ceil(blogPosts.length / POSTS_PER_PAGE),
    [blogPosts]
  );

  const currentPosts = useMemo(() => {
    const start = (pageNumber - 1) * POSTS_PER_PAGE;
    return blogPosts.slice(start, start + POSTS_PER_PAGE);
  }, [blogPosts, pageNumber]);

  const fetchBlogPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getBlogPosts();
      if (res?.ok) {
        setBlogPosts(res.data || []);
      } else {
        setError(res?.message || "Failed to fetch blog posts");
      }
    } catch (err) {
      setError("Error fetching blog posts");
      toast.error("Error fetching blog posts:" + err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const handleNextPage = () => {
    if (pageNumber < totalPages) setPageNumber((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (pageNumber > 1) setPageNumber((prev) => prev - 1);
  };

  const modalUpdatePost = (postId: number) => {
    setUpdatePostId(postId);
    const post = blogPosts.find((p) => p.id === postId);
    setUpdateBlog({ title: post?.title || "", content: post?.content || "" });
    setOpenUpdateModal(true);
  };

  const handleUpdateFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (updateLoading) return;

    setUpdateLoading(true);
    updateBlogPost(updatePostId, updateBlog)
      .then((res) => {
        if (res.ok) {
          toast.success("Blog post updated successfully!");
        } else {
          toast.error("Failed to update post: " + res.message);
          setError(res.message || "Failed to update post");
        }
      })
      .catch((err) => {
        toast.error("Error updating post:" + err);
        setError("Failed to update post");
      })
      .finally(() => {
        setUpdateLoading(false);
        fetchBlogPosts();
        setOpenUpdateModal(false);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            <span className="text-blue-600 font-bold">Update</span> Blog Posts
          </h1>
          <Link to="/" className="text-blue-600 hover:underline font-medium">
            Home
          </Link>
        </div>

        {isLoading && (
          <div className="text-center text-gray-600 py-8 text-lg font-medium">
            Loading...
          </div>
        )}
        {error && (
          <div className="text-center text-red-500 py-8 text-lg">{error}</div>
        )}

        {!isLoading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPosts.map((post) => {
                const createdAt = new Date(post.created_at || Date.now());
                const date = createdAt.toLocaleDateString();
                const time = createdAt.toLocaleTimeString();

                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <FileText size={20} className="text-blue-500" />
                      <h2 className="text-xl font-semibold text-gray-800">
                        {post.title}
                      </h2>
                    </div>

                    <p className="text-gray-700 mb-4 line-clamp-4">
                      {post.content}
                    </p>

                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>{date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>{time}</span>
                      </div>
                    </div>

                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => modalUpdatePost(post.id)}
                        className="px-4 py-2 text-sm text-gray-400 hover:text-blue-600 rounded hover:bg-blue-600/20 cursor-pointer transition-all"
                      >
                        <Edit2 size={16} className="inline mr-1" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {openUpdateModal && (
              <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                  <h2 className="text-xl font-semibold mb-4">Edit Blog Post</h2>
                  <form onSubmit={handleUpdateFormSubmit}>
                    <input
                      type="text"
                      placeholder="Title"
                      value={updateBlog.title}
                      onChange={(e) =>
                        setUpdateBlog({ ...updateBlog, title: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded mb-4"
                    />
                    <textarea
                      placeholder="Content"
                      value={updateBlog.content}
                      onChange={(e) =>
                        setUpdateBlog({
                          ...updateBlog,
                          content: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded mb-4 resize-none h-64"
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        disabled={updateLoading}
                        className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition-all"
                      >
                        {updateLoading ? "Updating..." : "Update"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setOpenUpdateModal(false)}
                        className="text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition-all w-full"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {blogPosts.length > POSTS_PER_PAGE && (
              <div className="mt-10 flex justify-center items-center space-x-6">
                <button
                  onClick={handlePrevPage}
                  disabled={pageNumber === 1}
                  className={`px-5 py-2 rounded-xl font-medium transition-all ${
                    pageNumber === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-100 shadow"
                  }`}
                >
                  Previous
                </button>

                <span className="text-gray-700 font-medium">
                  Page {pageNumber} of {totalPages}
                </span>

                <button
                  onClick={handleNextPage}
                  disabled={pageNumber === totalPages}
                  className={`px-5 py-2 rounded-xl font-medium transition-all ${
                    pageNumber === totalPages
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-100 shadow"
                  }`}
                >
                  Next
                </button>
              </div>
            )}

            {blogPosts.length === 0 && (
              <div className="text-center text-gray-500 py-6">
                No blog posts available to update.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WithAuth(UpdateBlogPosts);
