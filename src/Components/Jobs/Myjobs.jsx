import { useEffect, useState } from 'react';
import Footer from '../Layout/Footer'
import Header from '../Layout/Header'
import axios from 'axios'
import toast from 'react-hot-toast';
import JobCard from './JobCard';

const Myjobs = () => {
const [companiesData,setCompaniesData]=useState([]);
const getData=async ()=>{
  try{
    const response=await axios.get('http://localhost:4000/api/v1/jobs/getmyjobs',
        { withCredentials: true }
    );
    // console.log(response);
    setCompaniesData(response.data.myJobs);
  }catch(e){
    console.log(e);
    // toast.error(e.response.data.message);
  }
}

useEffect(()=>{
  getData();
},[]);

return (
  <>
  <Header/>
    {companiesData && companiesData.map((company, index) => (
      <JobCard key={index} company={company} />
    ))}
  <Footer/>
  </>
);
}

export default Myjobs
