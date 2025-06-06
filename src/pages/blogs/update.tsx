import { useEffect, useState, useMemo } from "react";
import { getBlogPosts, updateBlogPost } from "../../api/database";
import { WithAuth } from "../../hoc/withAuth";
import { Link } from "react-router-dom";

const POSTS_PER_PAGE = 2;

const UpdateBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updatePostId, setUpdatePostId] = useState<number>(0);
  const [updateBlog, setUpdateBlog] = useState({
    title: "",
    content: "",
  });
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

  const modalUpdatePost = (postId: number) => {
    // Logic to open a modal for updating the post
    setUpdatePostId(postId);
    if (!postId) {
      console.error("Post ID is required to update a post.");
      return;
    }
    // create a modal or form to update the post
    setUpdateBlog({
      title: blogPosts.find((post) => post.id === postId)?.title || "",
      content: blogPosts.find((post) => post.id === postId)?.content || "",
    });
    // Here you would typically open a modal or navigate to an update page
    // For demonstration, we'll just log the post ID
    setOpenUpdateModal((prev) => !prev);
    console.log(`Open modal to update post with ID: ${postId}`);
  };

  const handleUpdateFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!updateLoading) {
      setUpdateLoading(true);
      updateBlogPost(updatePostId, {
        title: updateBlog.title,
        content: updateBlog.content,
      })
        .then((res) => {
          console.log("Post updated successfully:", res);
        })
        .catch((err) => {
          console.error("Error updating post:", err);
          setError("Failed to update post");
        })
        .finally(() => {
          setUpdateLoading(false);
          fetchBlogPosts(); // Refresh the list after update
        });
    }

    setOpenUpdateModal(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Update Blog Posts</h1>
        <Link className="text-blue-600 hover:underline" to={"/"}>
          Home
        </Link>
      </div>

      {isLoading && <div className="text-center py-4">Loading...</div>}
      {error && <div className="text-red-500 text-center py-4">{error}</div>}

      {!isLoading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentPosts.map((post) => (
              <div key={post.id} className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-700 mb-4">{post.content}</p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => modalUpdatePost(post.id)}
                    className="p-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors duration-300 cursor-pointer"
                  >
                    Update
                  </button>
                </div>
              </div>
            ))}
          </div>
          {openUpdateModal && (
            <div className="fixed inset-0 bg-gray-800/10 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Update Post</h2>
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
                      setUpdateBlog({ ...updateBlog, content: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                  />
                  <div className="flex justify-center items-center flex-col">
                    <button
                      type="submit"
                      disabled={updateLoading}
                      className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition-colors duration-300 w-full"
                    >
                      {updateLoading ? "Updating..." : "Update"}
                    </button>
                    <button
                      onClick={() => setOpenUpdateModal(false)}
                      className="ml-2 mt-2  text-gray-700 px-4 py-2 rounded hover:bg-gray-200 cursor-pointer transition-colors duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

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

export default WithAuth(UpdateBlogPosts);
