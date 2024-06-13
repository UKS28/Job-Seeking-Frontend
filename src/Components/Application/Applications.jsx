import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Shimmer from '../Utils/Shimmer'

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const { jobId } = useParams();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/applications/employer/getall/${jobId}`,
          { withCredentials: true }
        );
        setApplications(response.data.applications);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, [jobId]);

  if (!applications || applications.length === 0) {
    return  (
      <div className="container mx-auto px-4 py-8">
        <Shimmer />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Applications for Job ID: {jobId}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.map((application, index) => (
          <div key={index} className="border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
            <p className="font-bold text-lg mb-2">Name: <span className="font-normal">{application.name}</span></p>
            <p className="mb-2">Email: <span className="font-normal">{application.email}</span></p>
            <p className="mb-2">Contact: <span className="font-normal">{application.contact}</span></p>
            <p className="mb-2">Gender: <span className="font-normal">{application.gender}</span></p>
            <p className="mb-2">Current Location: <span className="font-normal">{application.currentLocation}</span></p>
            <p className="mb-2">Year of Graduation: <span className="font-normal">{application.yearOfGraduation}</span></p>
            <p className="mb-2">Experience Year: <span className="font-normal">{application.experienceYear}</span></p>
            <p className="mb-2">Skill Set: <span className="font-normal">{application.skillSet}</span></p>
            <p className="mb-2">Why You: <span className="font-normal">{application.whyYou}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Applications;
