import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  useEffect(() => {
    document.title = "Register - Web Blog";
  }, []);

  type loadingType = boolean;

  const [loading, setLoading] = useState<loadingType>(false);
  // State variables for registration form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  // Handle registration form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    type Body = {
      email: string;
      password: string;
      confirmPassword: string;
      fullName: string;
      contactNumber: string;
    };

    const body: Body = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      fullName: fullName,
      contactNumber: contactNumber,
    };

    // create registration api here
    try {
      if (!loading) {
        setLoading((prev) => !prev);
        setTimeout(() => {
          console.log("data fetched successfully", body, loading);
          setLoading((prev) => !prev);
        }, 10000);
      }
    } catch (err) {
      console.error("Error during registration:", err);
    } finally {
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setFullName("");
      setContactNumber("");
    }

    // Handle registration logic here
  };

  return (
    <>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
          <h1 className="font-bold text-xl pb-2">Register</h1>
          <p>
            Already have an Account ?{" "}
            <Link className="text-blue-600 hover:underline" to={"/login"}>
              {" "}
              Login.
            </Link>
          </p>
          <div className="max-w-md w-auto mt-5 flex flex-col gap-2">
            <input
              className="p-2 border-2 border-gray-300 rounded-2xl"
              placeholder="Full Name"
              type="text"
              required
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              autoFocus
              autoComplete="name"
            />
            <input
              className="p-2 border-2 border-gray-300 rounded-2xl"
              placeholder="Contact Number"
              type="text"
              required
              onChange={(e) => setContactNumber(e.target.value)}
              value={contactNumber}
            />
            <input
              className="p-2 border-2 border-gray-300 rounded-2xl"
              placeholder="Email"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              className="p-2 border-2 border-gray-300 rounded-2xl"
              placeholder="Password"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <input
              className="p-2 border-2 border-gray-300 rounded-2xl"
              placeholder="Confirm Password"
              type="password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
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
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
