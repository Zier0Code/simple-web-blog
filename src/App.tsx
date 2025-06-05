import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./redux/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: any) => state.auth.user);
  useEffect(() => {
    document.title = "Simple Blog";
  }, []);

  return (
    <>
      <div>
        Hello Welcome to Simple Blog
        <p className="font-bold">account: {user.user.user_metadata.email}</p>
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

export default App;
