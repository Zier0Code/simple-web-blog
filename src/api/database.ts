import { supabase } from "../database/supabase";

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

export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
  return { ok: true, message: "User logged out successfully" };
};

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

export const deleteBlogPost = async (id: number) => {
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  return { ok: true, message: "Blog post deleted successfully" };
};

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
