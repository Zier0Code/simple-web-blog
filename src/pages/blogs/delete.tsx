import { useEffect, useState, useMemo } from "react";
import { deleteBlogPost, getBlogPosts } from "../../api/database";
import { WithAuth } from "../../hoc/withAuth";
import { Link } from "react-router-dom";

const POSTS_PER_PAGE = 2;

const DeleteBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "View Blog Posts - Web Blog";
  }, []);

  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.ceil(blogPosts.length / POSTS_PER_PAGE);
  }, [blogPosts]);

  // Get current posts for the current page
  const currentPosts = useMemo(() => {
    const startIndex = (pageNumber - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    return blogPosts.slice(startIndex, endIndex);
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
      console.error("Error fetching blog posts:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const handleDeletePost = async (id: number) => {
    try {
      if (!isLoading) {
        setIsLoading(true);
        deleteBlogPost(id)
          .then((res) => {
            if (res.ok) {
              console.log("Post deleted successfully:", res);
            } else {
              console.error("Failed to delete post:", res.message);
              setError(res.message || "Failed to delete post");
            }
          })
          .catch((err) => {
            console.error("Error deleting post:", err);
            setError("Error deleting post");
          })
          .finally(() => {
            setIsLoading(false);
            fetchBlogPosts(); // Refresh the list after deletion
          });
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      setError("Failed to delete post");
    }
  };

  const handleNextPage = () => {
    if (pageNumber < totalPages) {
      setPageNumber((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Delete Blog Posts</h1>
        <Link className="text-blue-600 hover:underline" to={"/"}>
          Home
        </Link>
      </div>

      {isLoading && <div className="text-center py-4">Loading...</div>}
      {error && <div className="text-red-500 text-center py-4">{error}</div>}

      {!isLoading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentPosts.map((post, idx) => (
              <div key={idx} className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-700 mb-4">{post.content}</p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="p-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors duration-300 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination controls */}
          {blogPosts.length > POSTS_PER_PAGE && (
            <div className="mt-8 flex justify-center items-center space-x-4">
              <button
                onClick={handlePrevPage}
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
                onClick={handleNextPage}
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
        </>
      )}
    </div>
  );
};

export default WithAuth(DeleteBlogPosts);
