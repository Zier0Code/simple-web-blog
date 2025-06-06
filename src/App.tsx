import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./redux/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { WithAuth } from "./hoc/withAuth";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.auth.user);
  useEffect(() => {
    document.title = "Simple Blog";
  }, []);

  const navigations = [
    { name: "Home", path: "/" },
    { name: "Blogs", path: "/blogs/views" },
    { name: "Create Blog", path: "/blogs/create" },
    { name: "Update Blog", path: "/blogs/update" },
    { name: "Delete Blog", path: "/blogs/delete" },
  ];
  return (
    <>
      <div>
        Hello Welcome to Simple Blog
        <div className="flex justify-center mt-4">
          {navigations.map((nav) => (
            <button
              key={nav.name}
              className="mx-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
              onClick={() => navigate(nav.path)}
            >
              {nav.name}
            </button>
          ))}
        </div>
        <p className="font-bold">account:{user?.user?.user_metadata?.email} </p>
      </div>
      <button
        className="mt-10 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300 hover:cursor-pointer"
        onClick={() => {
          dispatch(logout());
          navigate("/login");
        }}
      >
        Logout
      </button>
    </>
  );
}

export default WithAuth(App);
