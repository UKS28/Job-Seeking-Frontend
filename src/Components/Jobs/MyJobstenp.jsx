import { useContext, useEffect, useState } from "react"
import { Context } from "../../main";
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaCheck } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import Shimmer from "../Utils/Shimmer";
const MyJobstenp = () => {
    
   const [myJobs, setMyJobs] = useState([]);
   const [editingMode, setEditingMode] = useState(null);
   const { isAuthorized, user } = useContext(Context); 
   const navigateTo=useNavigate();

//    1.fetch my jobs
   const getData=async ()=>{
    try{
      const response=await axios.get('http://localhost:4000/api/v1/jobs/getmyjobs',
          { withCredentials: true }
      );
      // console.log(response);
      setMyJobs(response.data.myJobs);
    }catch(e){
      console.log(e);
      setMyJobs([]);
      // toast.error(e.response.data.message);
    }
  }
  useEffect(()=>{
    if (!isAuthorized || (user && user.role === "Job Seeker")) {
        navigateTo("/");
      }
    getData();
  },[]);

  if(myJobs.length===0){
    return  (
      <div className="container mx-auto px-4 py-8">
        <Shimmer />
      </div>
    );
  }

  const handleEnableEdit = (jobId) => {
    //Here We Are Giving Id in setEditingMode because We want to enable only that job whose ID has been send.
    setEditingMode(jobId);
  };

  //Function For Disabling Editing Mode
  const handleDisableEdit = () => {
    setEditingMode(null);
  };
  

  //Function For Updating The Job
  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    await axios
      .put(`http://localhost:4000/api/v1/jobs/update/${jobId}`, updatedJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  //Function For Deleting Job
  const handleDeleteJob = async (jobId) => {
    await axios
      .delete(`http://localhost:4000/api/v1/jobs/delete/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (jobId, field, value) => {
    // Update the job object in the jobs state with the new value
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <>
    <Header/>

   <div className="myJobs page py-10 bg-gray-100">
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Your Posted Jobs</h1>
      {myJobs.length > 0 ? (
        <div className="space-y-6">
          {myJobs.map((element) => (
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500" key={element._id}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block font-medium">Company Name:</label>
                    <input
                      type="text"
                      className="w-full mt-1 p-2 border rounded"
                      disabled={editingMode !== element._id}
                      value={element.companyName}
                      onChange={(e) => handleInputChange(element._id, "companyName", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block font-medium">Company Motto:</label>
                    <input
                      type="text"
                      className="w-full mt-1 p-2 border rounded"
                      disabled={editingMode !== element._id}
                      value={element.companyMotto}
                      onChange={(e) => handleInputChange(element._id, "companyMotto", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block font-medium">About Company:</label>
                    <input
                      type="text"
                      className="w-full mt-1 p-2 border rounded"
                      disabled={editingMode !== element._id}
                      value={element.aboutCompany}
                      onChange={(e) => handleInputChange(element._id, "aboutCompany", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block font-medium">Employee Count:</label>
                    <input
                      type="number"
                      className="w-full mt-1 p-2 border rounded"
                      disabled={editingMode !== element._id}
                      value={element.employeeCount}
                      onChange={(e) => handleInputChange(element._id, "employeeCount", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block font-medium">Location:</label>
                    <input
                      type="text"
                      className="w-full mt-1 p-2 border rounded"
                      disabled={editingMode !== element._id}
                      value={element.location}
                      onChange={(e) => handleInputChange(element._id, "location", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block font-medium">Role:</label>
                    <input
                      type="text"
                      className="w-full mt-1 p-2 border rounded"
                      disabled={editingMode !== element._id}
                      value={element.role}
                      onChange={(e) => handleInputChange(element._id, "role", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block font-medium">Fixed Salary:</label>
                    <input
                      type="number"
                      className="w-full mt-1 p-2 border rounded"
                      disabled={editingMode !== element._id}
                      value={element.fixedSalary}
                      onChange={(e) => handleInputChange(element._id, "fixedSalary", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block font-medium">Experience:</label>
                    <input
                      type="number"
                      className="w-full mt-1 p-2 border rounded"
                      disabled={editingMode !== element._id}
                      value={element.experience}
                      onChange={(e) => handleInputChange(element._id, "experience", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block font-medium">Skills:</label>
                    <input
                      type="text"
                      className="w-full mt-1 p-2 border rounded"
                      disabled={editingMode !== element._id}
                      value={element.skill}
                      onChange={(e) => handleInputChange(element._id, "skill", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block font-medium">Job Type:</label>
                    <select
                      className="w-full mt-1 p-2 border rounded"
                      value={element.jobType}
                      onChange={(e) => handleInputChange(element._id, "jobType", e.target.value)}
                      disabled={editingMode !== element._id}
                    >
                      <option value="Full Time">Full Time</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium">Job Mode:</label>
                    <select
                      className="w-full mt-1 p-2 border rounded"
                      value={element.jobMode}
                      onChange={(e) => handleInputChange(element._id, "jobMode", e.target.value)}
                      disabled={editingMode !== element._id}
                    >
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Onsite">Onsite</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium">Expired:</label>
                    <select
                      className="w-full mt-1 p-2 border rounded"
                      value={element.expired}
                      onChange={(e) => handleInputChange(element._id, "expired", e.target.value)}
                      disabled={editingMode !== element._id}
                    >
                      <option value={true}>TRUE</option>
                      <option value={false}>FALSE</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <label className="block font-medium">Job Description:</label>
                <textarea
                  rows={5}
                  className="w-full mt-1 p-2 border rounded"
                  value={element.job_description}
                  disabled={editingMode !== element._id}
                  onChange={(e) => handleInputChange(element._id, "job_description", e.target.value)}
                />
              </div>
              <div className="flex justify-between items-center mt-6">
                <div className="flex gap-2">
                  {editingMode === element._id ? (
                    <>
                      <button
                        onClick={() => handleUpdateJob(element._id)}
                        className="bg-green-500 text-white py-2 px-4 rounded"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => handleDisableEdit()}
                        className="bg-red-500 text-white py-2 px-4 rounded"
                      >
                        <RxCross2 />
                      </button>
                    </>
                  ) : (
                    <button
                    onClick={() => handleEnableEdit(element._id)}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                    Edit
                    </button>
                    )}
                    </div>
                    <button
                    onClick={() => handleDeleteJob(element._id)}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    >
                    Delete
                    </button>
                    <Link
                     to={`/application/${element._id}`}
                    className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600"
                    >
                    View Applications
                    </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">You have not posted any job or may be you deleted all of your jobs!</p>
      )}
    </div>
  </div>



    <Footer/>
    </>
  )
}

export default MyJobstenp
