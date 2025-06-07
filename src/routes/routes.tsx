import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/register";
import Login from "../pages/login";
import CreateBlog from "../pages/blogs/create";
import ViewBlogPosts from "../pages/blogs/view";
import DeleteBlogPosts from "../pages/blogs/delete";
import UpdateBlogPosts from "../pages/blogs/update";
import LandingPage from "../pages/landing";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/landing",
    element: <LandingPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/blogs/create",
    element: <CreateBlog />,
  },
  {
    path: "/blogs/views",
    element: <ViewBlogPosts />,
  },
  {
    path: "/blogs/update",
    element: <UpdateBlogPosts />,
  },
  {
    path: "/blogs/delete",
    element: <DeleteBlogPosts />,
  },
]);
