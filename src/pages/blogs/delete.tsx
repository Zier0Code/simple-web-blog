import { useEffect, useState, useMemo } from "react";
import { deleteBlogPost, getBlogPosts } from "../../api/database";
import { WithAuth } from "../../hoc/withAuth";
import { Link } from "react-router-dom";
import { Calendar, Clock, FileText, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const POSTS_PER_PAGE = 6;

const DeleteBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<number | null>(null);

  useEffect(() => {
    document.title = "Delete Blog Posts - Web Blog";
    fetchBlogPosts();
  }, []);

  const totalPages = useMemo(
    () => Math.ceil(blogPosts.length / POSTS_PER_PAGE),
    [blogPosts]
  );

  const currentPosts = useMemo(() => {
    const startIndex = (pageNumber - 1) * POSTS_PER_PAGE;
    return blogPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
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
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePost = async (id: number) => {
    if (!isLoading) {
      setIsLoading(true);
      try {
        const res = await deleteBlogPost(id);
        if (res.ok) {
          toast.success("Post deleted successfully");
        } else {
          setError(res.message || "Failed to delete post");
        }
      } catch (err) {
        console.error(err);
        setError("Error deleting post");
      } finally {
        setOpenDeleteModal(null);
        setIsLoading(false);
        fetchBlogPosts();
      }
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          <span className="text-blue-600 font-bold">Delete</span> Blog Posts
        </h1>
        <Link to="/" className="text-blue-600 hover:underline font-medium">
          Home
        </Link>
      </div>

      {isLoading && <div className="text-center py-8">Loading...</div>}
      {error && <div className="text-center text-red-500 py-4">{error}</div>}

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
                      onClick={() => setOpenDeleteModal(post.id)}
                      className="p-2 text-sm text-red-500  rounded hover:bg-red-600/20 cursor-pointer transition-all"
                    >
                      <Trash2 size={16} className="inline mr-1" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Pagination */}
          {blogPosts.length > POSTS_PER_PAGE && (
            <div className="mt-8 flex justify-center items-center space-x-4">
              <button
                onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
                disabled={pageNumber === 1}
                className={`px-4 py-2 rounded transition-colors duration-300 ${
                  pageNumber === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                Previous
              </button>

              <span className="text-gray-700">
                Page {pageNumber} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setPageNumber((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={pageNumber === totalPages}
                className={`px-4 py-2 rounded transition-colors duration-300 ${
                  pageNumber === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                Next
              </button>
            </div>
          )}

          {blogPosts.length === 0 && (
            <div className="text-center text-gray-500 py-12">
              No blog posts available to delete.
            </div>
          )}

          {/* Confirmation Modal */}
          {openDeleteModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
              <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this blog post? This action
                  cannot be undone.
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => handleDeletePost(openDeleteModal)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setOpenDeleteModal(null)}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WithAuth(DeleteBlogPosts);
