import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser as registerAPI } from "../api/database";
import { login } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import registerImage from "../assets/images/img2.jpg";

const Register = () => {
  useEffect(() => {
    document.title = "Register - Web Blog";
  }, []);

  type loadingType = boolean;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<loadingType>(false);
  // State variables for registration form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle registration form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    type User = {
      email: string;
      password: string;
      // confirmPassword: string;
      // fullName: string;
      // contactNumber: string;
    };

    const body: User = {
      email: email,
      password: password,
      // confirmPassword: confirmPassword,
      // fullName: fullName,
      // contactNumber: contactNumber,
    };

    // create registration api here
    try {
      if (!loading) {
        setLoading((prev) => !prev);
        registerAPI(body)
          .then((res) => {
            if (res.ok) {
              // Dispatch login action with user data
              dispatch(login(res.data));
              // Navigate to the home page after successful registration
              navigate("/");
              alert("Registration successful! Please log in.");
            } else {
              console.error("Registration failed:", res.message);
            }
          })
          .catch((err) => {
            console.error("Error during registration:", err);
          })
          .finally(() => {
            setLoading((prev) => !prev);
            setEmail("");
            setPassword("");
          });
      }
    } catch (err) {
      console.error("Error during registration:", err);
    }

    // Handle registration logic here
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:absolute md:left-0 md:top-30 mx-auto md:px-40 sm:grid-gap-2 p-10 w-full md:justify-around -z-10 bg-gray-100">
        <div>
          <img
            src={registerImage}
            alt="Login"
            className="md:w-96 md:h-96 object-cover shadow-lg mb-10"
            style={{
              boxShadow: "-20px 20px 0 0 rgba(0,0,0,.8)", // solid shadow, 10px right, -5px up, no blur, semi-transparent black
            }}
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-4 self-center"
        >
          <div className="flex justify-start ">
            <h1 className="font-bold text-3xl pb-2 text-center">Register</h1>
          </div>

          <div className="max-w-md w-auto flex flex-col gap-2">
            <input
              className="p-2 border-2 border-gray-300 rounded-2xl"
              placeholder="Email"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              autoFocus
            />
            <input
              className="p-2 border-2 border-gray-300 rounded-2xl"
              placeholder="Password"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <p className="text-xs ml-2">
            Already have an Account ?{" "}
            <Link className="text-blue-600 hover:underline" to={"/login"}>
              {" "}
              Login.
            </Link>
          </p>
          <button
            className={`bg-black  max-w-md p-2 rounded-2xl  transition-colors duration-300  ${
              loading
                ? "cursor-not-allowed bg-gray-200 text-black/60"
                : "cursor-pointer hover:bg-gray-800 text-white"
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
