import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Login = () => {
  useEffect(() => {
    document.title = "Register - Web Blog";
  }, []);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state: any) => state.auth.user);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    type Body = {
      email: string;
      password: string;
    };

    const body: Body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };

    // create login api here
    try {
      if (!loading) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
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
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
          <h1 className="font-bold text-xl pb-2">Login</h1>
          <p>
            Don't Have an Account?{" "}
            <Link className="text-blue-600 hover:underline" to={"/register"}>
              {" "}
              Register.
            </Link>
          </p>
          <div className="max-w-md w-auto mt-5 flex flex-col gap-2">
            <input
              className="p-2 border-2 border-gray-300 rounded-2xl"
              placeholder="Email"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              autoFocus
            />
            <input
              className="p-2 border-2 border-gray-300 rounded-2xl"
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

          <button
            className={`bg-black  p-2 rounded-2xl  transition-colors duration-300  ${
              loading
                ? "cursor-not-allowed bg-gray-200 text-black/60"
                : "cursor-pointer hover:bg-gray-800 text-white"
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
