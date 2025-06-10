import { supabase } from "../database/supabase";

/**
 * Registers a new user using Supabase authentication.
 * @param user - Object containing email and password.
 * @returns Result object with registration status and data.
 * @throws Error if registration fails.
 */
export const registerUser = async (user: {
  email: string;
  password: string;
}) => {
  const { data, error } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
  });
  if (error) {
    throw new Error(error.message);
  }
  return { ok: true, data, message: "User registered successfully" };
};

/**
 * Logs in a user using Supabase authentication.
 * @param user - Object containing email and password.
 * @returns Result object with login status and data.
 * @throws Error if login fails.
 */
export const loginUser = async (user: { email: string; password: string }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: user.password,
  });
  if (error) {
    throw new Error(error.message);
  }
  return { ok: true, data, message: "User logged in successfully" };
};

/**
 * Logs out the current user using Supabase authentication.
 * @returns Result object with logout status.
 * @throws Error if logout fails.
 */
export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
  return { ok: true, message: "User logged out successfully" };
};

/**
 * Creates a new blog post in the 'blog_posts' table.
 * @param post - Object containing title, content, and author_email.
 * @returns Result object with creation status and new post data.
 * @throws Error if creation fails.
 */
export const createBlogPost = async (post: {
  title: string;
  content: string;
  author_email: string;
}) => {
  const { data, error } = await supabase
    .from("blog_posts")
    .insert([
      {
        title: post.title,
        content: post.content,
        author_email: post.author_email,
      },
    ])
    .select()
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return { ok: true, data, message: "Blog post created successfully" };
};

/**
 * Retrieves paginated blog posts from the 'blog_posts' table.
 * @param page - Page number (default: 1).
 * @param pageSize - Number of posts per page (default: 6).
 * @returns Result object with posts, count, and pagination info.
 * @throws Error if retrieval fails.
 */
export const getBlogPosts = async (page: number = 1, pageSize: number = 6) => {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from("blog_posts")
    .select("*", { count: "exact" })
    .range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  return {
    ok: true,
    data,
    count,
    page,
    pageSize,
    message: "Blog posts retrieved successfully",
  };
};

/**
 * Deletes a blog post by its ID.
 * @param id - The ID of the blog post to delete.
 * @returns Result object with deletion status.
 * @throws Error if deletion fails.
 */
export const deleteBlogPost = async (id: number) => {
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  return { ok: true, message: "Blog post deleted successfully" };
};

/**
 * Updates a blog post by its ID.
 * @param id - The ID of the blog post to update.
 * @param post - Object containing updated title and/or content.
 * @returns Result object with update status and updated post data.
 * @throws Error if update fails.
 */
export const updateBlogPost = async (
  id: number,
  post: {
    title?: string;
    content?: string;
  }
) => {
  const { data, error } = await supabase
    .from("blog_posts")
    .update(post)
    .eq("id", id)
    .select()
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return { ok: true, data, message: "Blog post updated successfully" };
};
