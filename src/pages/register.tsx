import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Register = () => {
  const user = useSelector((state: any) => state.auth.user);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle registration logic here
    console.log("Registration form submitted", user?.email);
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
              placeholder="Email"
              type="email"
            />
            <input
              className="p-2 border-2 border-gray-300 rounded-2xl"
              placeholder="Password"
              type="password"
            />
          </div>
          <button
            className="bg-black text-white p-2 rounded-2xl hover:bg-gray-800 transition-colors duration-300"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
