import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Shimmer from "../Utils/Shimmer";

const Applications = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [editingMode,setEditingMode]=useState(null);
  const [status,setStatus]=useState("Pending");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          `https://job-seeking-backend-e4fu.onrender.com/api/v1/applications/employer/getall/${jobId}`,
          { withCredentials: true }
        );
        setApplications(response.data.applications);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, [jobId]);


  const handleStatusChange = async (applicationId, status) => {
    try {
      const response = await axios.put(
        `https://job-seeking-backend-e4fu.onrender.com/api/v1/applications/employer/application/${applicationId}`,
        { status },
        { withCredentials: true }
      );
      // Update the application status in the state
      setApplications(prevApplications =>
        prevApplications.map(application =>
          application._id === applicationId
            ? { ...application, status: status }
            : application
        )
      );
      console.log(response.data.message);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };


  if (!applications || applications.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Shimmer />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Applications for Job ID: {jobId}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.map((application, index) => (
          <div
            key={index}
            className="border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <p className="font-bold text-lg mb-2">
              Name: <span className="font-normal">{application.name}</span>
            </p>
            <p className="mb-2">
              Email: <span className="font-normal">{application.email}</span>
            </p>
            <p className="mb-2">
              Contact:{" "}
              <span className="font-normal">{application.contact}</span>
            </p>
            <p className="mb-2">
              Gender: <span className="font-normal">{application.gender}</span>
            </p>
            <p className="mb-2">
              Current Location:{" "}
              <span className="font-normal">{application.currentLocation}</span>
            </p>
            <p className="mb-2">
              Year of Graduation:{" "}
              <span className="font-normal">
                {application.yearOfGraduation}
              </span>
            </p>
            <p className="mb-2">
              Experience Year:{" "}
              <span className="font-normal">{application.experienceYear}</span>
            </p>
            <p className="mb-2">
              Skill Set:{" "}
              <span className="font-normal">{application.skillSet}</span>
            </p>
            <p className="mb-2">
              Why You: <span className="font-normal">{application.whyYou}</span>
            </p>
            <p className="mb-2">
              Status: <span className="font-normal">{application.status}</span>
            </p>
            <div className="mt-4">
              <label htmlFor={`status-${index}`} className="block mb-2 font-bold">Change Status:</label>
              <select
                disabled={editingMode !== application._id}
                id={`status-${index}`}
                className="border rounded p-2 w-full"
                value={editingMode !== application._id ?application.status:status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Active">Active</option>
                <option value="Short Listed">Short Listed</option>
              </select>
              <button
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                onClick={() => handleStatusChange(application._id, document.getElementById(`status-${index}`).value)}
              >
                Update Status
              </button>
              <button
                className="mx-4 mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                onClick={() => setEditingMode(application._id)}
              >
                Edit Status
              </button>
            </div>
          </div>

        ))}
      </div>
    </div>
  );
};

export default Applications;
