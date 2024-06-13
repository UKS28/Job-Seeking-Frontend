import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Context } from '../../main';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import Shimmer from '../Utils/Shimmer';
const SingleJob = () => {

  const { jobId } = useParams();
  const {user}=useContext(Context);
  const [job,setJob]=useState(null);
  const [alreadyApplied,setAlreadyApplied]=useState(false);
  const fetchJob=async ()=>{
    try{
      const { data }= await axios.get(`http://localhost:4000/api/v1/jobs/${jobId}`);
      setJob(data.job);
      console.log(data.job);
    }
    catch(e){
      console.log(e);
    }
  }


  const getAllreadyApplied=async ()=>{
    try{
      const {data}=await axios.get(`http://localhost:4000/api/v1/applications//applicant/application/${jobId}`,{withCredentials:true })
      setAlreadyApplied(data.final); 

    }catch(err){
      console.log(err.response.data.message);
    }

  }
  useEffect(()=>{
    fetchJob();
    getAllreadyApplied();
  },[jobId])
  
  if(job===null){
    return  (
      <div className="container mx-auto px-4 py-8">
        <Shimmer />
      </div>
    );
  }
  return (
  <>
  <Header/>
  {job && (
    <div className="mt-28 container mx-auto p-4 space-y-6">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold mb-2">{job.role} ({job.experience}+ years experience)</h1>
        <h3 className="text-xl text-gray-700 mb-1">₹ {job.fixedSalary}</h3>
        <h5 className="text-sm text-gray-500">Posted on {new Date(job.jobPostedOn).toLocaleDateString()}</h5>
      </div>

      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold mb-2">{job.companyName}</h2>
        <h4 className="text-lg text-gray-600 mb-4">{job.companyMotto}</h4>
        <div className="flex space-x-4">
          <span className="bg-gray-200 text-gray-800 py-1 px-3 rounded">{job.location}</span>
          <span className="bg-gray-200 text-gray-800 py-1 px-3 rounded">Employee count: {job.employeeCount}</span>
          <span className="bg-gray-200 text-gray-800 py-1 px-3 rounded">Private Company</span>
        </div>
      </div>

      <div className="p-6 border-b border-gray-200">
        <p className="mb-2"><strong>Job Location:</strong> {job.location}</p>
        <p className="mb-2"><strong>Job Mode:</strong> {job.jobMode}</p>
        <p className="mb-2"><strong>Job Type:</strong> {job.jobType}</p>
        <p className="mb-2"><strong>Skills Required:</strong> {job.skill}</p>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">The Role</h2>
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">About The Company</h4>
          <p className="text-gray-700">{job.aboutCompany}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">What We are Looking For</h3>
          <p className="text-gray-700">{job.job_description}</p>
        </div>
      </div>

      {
        user.role==="Job Seeker" && alreadyApplied===false &&
        
        <div className="flex justify-center">
          <button className="bg-black text-white py-2 px-4 rounded hover:bg-blue-500">
            <Link to={`/application-form/${job._id}`}>Apply</Link>
          </button>
        </div>

      }

      {
        user.role==="Job Seeker" && alreadyApplied===true &&
        
        <div className="flex justify-center">
          <button className="bg-black text-white py-2 px-4 rounded hover:bg-blue-500">
            Already applied 
          </button>
        </div>

      }
      
    </div>
  )}
  <Footer/>
</>
  );
}

export default SingleJob
