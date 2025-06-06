import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/register";
import Login from "../pages/login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
