import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/logo2.png";
import { useContext } from "react";
import { Context } from "../../main";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "https://job-seeking-backend-e4fu.onrender.com/api/v1/users/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };
  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="flex justify-between items-center mx-6   ">
        {/* 1.logo */}
        <div className="flex">
          <div className="font-bold text-center h-15 w-33 flex items-center justify-center text-2xl">
            Job Seeking
          </div>
          <img src={logo} className="rounded-full h-15 w-20" />
        </div>
        {/* 2.functional parts */}
        <div className="flex space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-lg transition duration-300 ease-in-out ${
                isActive
                  ? "underline text-blue-500"
                  : "text-black hover:text-red-500 hover:underline hover:shadow-md"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/all-jobs"
            className={({ isActive }) =>
              `text-lg transition duration-300 ease-in-out ${
                isActive
                  ? "underline text-blue-500"
                  : "text-black hover:text-red-500 hover:underline hover:shadow-md"
              }`
            }
          >
            All Jobs
          </NavLink>

          {user.role === "Job Seeker" ? (
            <NavLink
              to="/my-application"
              className={({ isActive }) =>
                `text-lg transition duration-300 ease-in-out ${
                  isActive
                    ? "underline text-blue-500"
                    : "text-black hover:text-red-500 hover:underline hover:shadow-md"
                }`
              }
            >
              Applied
            </NavLink>
          ) : (
            <NavLink
              to="/my-jobs"
              className={({ isActive }) =>
                `text-lg transition duration-300 ease-in-out ${
                  isActive
                    ? "underline text-blue-500"
                    : "text-black hover:text-red-500 hover:underline hover:shadow-md"
                }`
              }
            >
              My Jobs
            </NavLink>
          )}
          {user.role === "Employee" && (
            <NavLink
              to="/post-job"
              className={({ isActive }) =>
                `text-lg transition duration-300 ease-in-out ${
                  isActive
                    ? "underline text-blue-500"
                    : "text-black hover:text-red-500 hover:underline hover:shadow-md"
                }`
              }
            >
              Post a Job
            </NavLink>
          )}
        </div>
        {/* 3. login/signup or profile/logout */}

        {isAuthorized ? (
          <div className="flex space-x-6">
            <button
              className="m-2 p-3 text-lg bg-black text-white border rounded-lg cursor-pointer  hover:bg-red-500 transition duration-300 ease-in-out"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex space-x-6">
            <div className="m-2 p-3 text-lg bg-white text-black border rounded-lg cursor-pointer hover:bg-red-500 transition duration-300 ease-in-out">
              <Link to="/login">Login</Link>
            </div>
            <div className="m-2 p-3 text-lg bg-black text-white border rounded-lg cursor-pointer  hover:bg-red-500 transition duration-300 ease-in-out">
              <Link to="/register">Sign-Up</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
