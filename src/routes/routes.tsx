import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/register";
import Login from "../pages/login";
import PrivateRoutes from "./privateroutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoutes>
        <App />
      </PrivateRoutes>
    ),
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
