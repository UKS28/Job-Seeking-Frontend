import { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const PostJob = () => {
  const [companyName, setCompanyName] = useState("");
  const [companyMotto, setCompanyMotto] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");
  const [employeeCount, setEmployeeCount] = useState(10);
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("");
  const [fixedSalary, setFixedSalary] = useState(700000);
  const [experience, setExperience] = useState(0);
  const [job_description, setJobDescription] = useState("");
  const [skill, setSkill] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobMode, setJobMode] = useState("onSite");

  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();
  useEffect(() => {
    if (!isAuthorized || (user && user.role === "Job Seeker")) {
      navigateTo("/");
    }
  }, [isAuthorized, user, navigateTo]);

  const handlePost = async (ev) => {
    ev.preventDefault();

    try {
      const data = await axios.post(
        "https://job-seeking-backend-e4fu.onrender.com/api/v1/jobs/post",
        {
          companyName,
          companyMotto,
          aboutCompany,
          employeeCount,
          location,
          role,
          fixedSalary,
          experience,
          job_description,
          skill,
          jobType,
          jobMode,
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setCompanyName("");
      setCompanyMotto("");
      setAboutCompany("");
      setEmployeeCount(10);
      setLocation("");
      setRole("");
      setFixedSalary(700000);
      setExperience(0);
      setJobDescription("");
      setSkill("");
      setJobType("");
      setJobMode("onSite");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  //console.log("post job", isAuthorized, user.role);
  
  return (
    <>
      <Header />
      <div className="flex justify-center mt-28 mb-12">
        <form
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg"
          onSubmit={handlePost}
        >
          <h2 className="text-2xl font-bold mb-6">Post a Job</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(ev) => setCompanyName(ev.target.value)}
              placeholder="XYZ Ltd"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Motto
            </label>
            <input
              type="text"
              value={companyMotto}
              onChange={(ev) => setCompanyMotto(ev.target.value)}
              placeholder="Motto..."
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              About the Organisation
            </label>
            <textarea
              rows="10"
              value={aboutCompany}
              onChange={(ev) => setAboutCompany(ev.target.value)}
              placeholder="About..."
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Count of Employees
            </label>
            <input
              type="text"
              value={employeeCount}
              onChange={(ev) => setEmployeeCount(ev.target.value)}
              placeholder="1000"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(ev) => setLocation(ev.target.value)}
              placeholder="Location"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <input
              type="text"
              value={role}
              onChange={(ev) => setRole(ev.target.value)}
              placeholder="Role"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Salary
            </label>
            <input
              type="text"
              value={fixedSalary}
              onChange={(ev) => setFixedSalary(ev.target.value)}
              placeholder="Salary"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Years of Experience Required
            </label>
            <input
              type="text"
              value={experience}
              onChange={(ev) => setExperience(ev.target.value)}
              placeholder="Years"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description
            </label>
            <textarea
              rows="10"
              value={job_description}
              onChange={(ev) => setJobDescription(ev.target.value)}
              placeholder="Maximum 500 words"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills Required
            </label>
            <input
              type="text"
              value={skill}
              onChange={(ev) => setSkill(ev.target.value)}
              placeholder="Skills"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Type
            </label>
            <select
              onChange={(ev) => setJobType(ev.target.value)}
              value={jobType}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Select a Job Type</option>
              <option>Full Time</option>
              <option>Internship</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mode
            </label>
            <select
              value={jobMode}
              onChange={(ev) => setJobMode(ev.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Select a Job Mode</option>
              <option>Onsite</option>
              <option>Hybrid</option>
              <option>WFH</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Post Job
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default PostJob;
