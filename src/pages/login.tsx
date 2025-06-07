import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser as LoginApi } from "../api/database";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import loginImage from "../assets/images/img3.jpg";

const Login = () => {
  useEffect(() => {
    document.title = "Login - Web Blog";
  }, []);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    type Body = {
      email: string;
      password: string;
    };

    const body: Body = {
      email: email,
      password: password,
    };

    // create login api here
    try {
      if (!loading) {
        setLoading(true);
        LoginApi(body)
          .then((res) => {
            if (res.ok) {
              console.log("Login successful:", res);
              // Dispatch login action with user data
              dispatch(login(res.data));

              // Navigate to the home page after successful login
              navigate("/");
            }
          })
          .catch((err) => {
            console.error("Error during login:", err);
          })
          .finally(() => {
            setLoading(false);
            setEmail("");
            setPassword("");
          });
      }
    } catch (err) {
      console.error("Error during login:", err);
    } finally {
      setEmail("");
      setPassword("");
    }
  };
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:absolute md:left-0 md:top-30 mx-auto md:px-40 sm:grid-gap-2 p-10 w-full md:justify-around -z-10 bg-gray-100">
        <div>
          <img
            src={loginImage}
            alt="Login"
            className="md:w-96 md:h-96 object-cover shadow-lg mb-10 size-60 flex self-center  "
            style={{
              boxShadow: "-20px 20px 0 0 rgba(0,0,0,.8)", // solid shadow, 10px right, -5px up, no blur, semi-transparent black
            }}
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-4 self-center w-full"
        >
          <div className="flex justify-start ">
            <h1 className="font-bold text-3xl pb-2 text-center">Login</h1>
          </div>
          <div className="max-w-md w-full flex flex-col gap-2">
            <input
              className="p-2 border-2 border-gray-300 rounded-2xl w-full"
              placeholder="Email"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              autoFocus
            />
            <input
              className="p-2 border-2 border-gray-300 rounded-2xl w-full"
              placeholder="Password"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              maxLength={20}
              minLength={8}
            />
          </div>
          <p className="text-xs ml-2">
            Don't Have an Account?{" "}
            <Link className="text-blue-600 hover:underline" to={"/register"}>
              {" "}
              Register.
            </Link>
          </p>
          <button
            className={`bg-black  max-w-md p-2 rounded-2xl  transition-colors duration-300  ${
              loading
                ? "cursor-not-allowed bg-gray-200 text-black/60"
                : "cursor-pointer hover:bg-gray-800 text-white font-bold"
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
