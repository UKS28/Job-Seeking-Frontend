import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Shimmer from "../Utils/Shimmer";
import { Link } from "react-router-dom";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
const MyApplication = () => {
  const [applications, setApplications] = useState([]);
  const fetchApplication = async () => {
    try {
      const { data } = await axios.get(
        "https://job-seeking-backend-e4fu.onrender.com/api/v1/applications/applicant/getall",
        { withCredentials: true }
      );
      setApplications(data.jobDetails);
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err.response.data.message);
    }
  };
  useEffect(() => {
    fetchApplication();
  }, []);

  if (applications.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Shimmer />
      </div>
    );
  }
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 mt-24">
        <h1 className="text-4xl font-bold text-center mb-8">
          Job Applications
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {applications.map((application, index) => (
            <Link
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:-translate-y-1 hover:shadow-2xl transition duration-300 ease-in-out"
              to={`/job/${application._id}`}
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">
                  {application.companyName}
                </h2>
                <p className="text-gray-700 mb-1">Role: {application.role}</p>
                <p className="text-gray-700 mb-1">
                  Salary: ₹{application.fixedSalary} Lakhs per Annum
                </p>
                <p className="text-gray-700 mb-1">
                  Skills: {application.skill}
                </p>
                <p className="text-gray-700 mb-1">
                  Job Type: {application.jobType}
                </p>
                <p className="text-gray-700 mb-1">
                  Location: {application.location}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyApplication;
