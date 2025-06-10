import { useEffect, useState } from "react";
import { getBlogPosts } from "../../api/database";
import { WithAuth } from "../../hoc/withAuth";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, FileText } from "lucide-react";

const POSTS_PER_PAGE = 6;

const ViewBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "View Blog Posts - Blogify";
  }, []);

  useEffect(() => {
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
        console.error("Fetch error:", err);
        setError("Error fetching blog posts");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const handleNextPage = () => {
    if (pageNumber < 10) setPageNumber((prev) => prev + 1);
    getBlogPosts(pageNumber + 1)
      .then((res) => {
        if (res?.ok) {
          setBlogPosts(res.data || []);
        } else {
          setError(res?.message || "Failed to fetch next page of blog posts");
        }
      })
      .catch((err) => {
        console.error("Next page fetch error:", err);
        setError("Error fetching next page of blog posts");
      });
  };

  const handlePrevPage = () => {
    if (pageNumber > 1) setPageNumber((prev) => prev - 1);
    getBlogPosts(pageNumber - 1)
      .then((res) => {
        if (res?.ok) {
          setBlogPosts(res.data || []);
        } else {
          setError(res?.message || "Failed to fetch next page of blog posts");
        }
      })
      .catch((err) => {
        console.error("Next page fetch error:", err);
        setError("Error fetching next page of blog posts");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Blog Posts</h1>
          <Link to="/" className="text-blue-600 hover:underline font-medium">
            Home
          </Link>
        </div>

        {isLoading && (
          <div className="text-center text-gray-600 py-8 text-lg font-medium">
            Loading blog posts...
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 py-8 text-lg">{error}</div>
        )}

        {!isLoading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => {
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

                    <div className="flex items-center text-sm text-gray-500 space-x-4 mt-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>{date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>{time}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex justify-between items-center mt-8">
              <button
                onClick={handlePrevPage}
                disabled={pageNumber === 1}
                className={`px-4 py-2 text-sm text-gray-600 rounded hover:bg-gray-200 transition-all ${
                  pageNumber === 1 ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                Previous
              </button>
              <span className="text-sm text-gray-600">
                Page {pageNumber} of {10}
              </span>
              {blogPosts.length >= 5 && (
                <button
                  onClick={handleNextPage}
                  disabled={pageNumber === 10}
                  className={`px-4 py-2 text-sm text-gray-600 rounded hover:bg-gray-200 transition-all ${
                    pageNumber === 10 ? "cursor-not-allowed opacity-50" : ""
                  }`}
                >
                  Next
                </button>
              )}
            </div>
            {blogPosts.length === 0 && (
              <div className="text-center text-gray-500 py-6">
                No blog posts available to view.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WithAuth(ViewBlogPosts);
