import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Login = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleHidePassword = (ev) => {
    ev.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    console.log(email, password, role);
    try {
      const { data } = await axios.post(
        "https://job-seeking-backend-e4fu.onrender.com/api/v1/users/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(data);
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
      setUser(data.user);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };
  console.log("isauthorized", isAuthorized);
  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-4">Job Seeker</h2>

      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold">Login</h3>
        <span className="text-gray-600">Find the job made for you!</span>
      </div>

      <form className="bg-white rounded-lg shadow-md p-6 w-96">
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">
            Choose Role
          </label>
          <select
            className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            value={role}
            onChange={(ev) => setRole(ev.target.value)}
          >
            <option>Select a role</option>
            <option>Job Seeker</option>
            <option>Employee</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Email</label>
          <input
            className="block w-full p-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            placeholder="Email"
            type="text"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
        </div>

        <div className="mb-6 relative">
          <label className="block text-lg font-semibold mb-3">Password</label>
          <div className="flex items-center">
            <input
              className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 pr-10"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <button
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              onClick={handleHidePassword}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
            </button>
          </div>
        </div>

        <button
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>

      <div className="mt-4 text-gray-600">
        Not registered?{" "}
        <Link to="/register" className="text-blue-500 hover:underline">
          Create an Account
        </Link>
      </div>
    </div>
  );
};

export default Login;
