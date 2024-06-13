import  { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const ApplicationForm = () => {

  const { jobId }=useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    gender: '',
    currentLocation: '',
    yearOfGraduation: '',
    experienceYear: '',
    skillSet: '',
    whyYou: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(formData);
//     try {
//       const response = await axios.post(`http://localhost:4000/api/v1/applications/post/${jobId}`, formData,{
//         headers: {
//           "Content-Type": "application/json",
//         },
//         withCredentials: true,
//     });
//       console.log(response.data);
//       // Reset form after submission
//       setFormData({
//         name: '',
//         email: '',
//         contact: '',
//         gender: '',
//         currentLocation: '',
//         yearOfGraduation: '',
//         experienceYear: '',
//         skillSet: '',
//         whyYou: '',
//       });
//       toast.success(Response.data.message)
//     } catch (error) {
//       console.error('Error submitting form', error);
//     }
//   };
// requesting_on:
// 66688a1c1ea78e741b3b32e8
// resquest send on:
// 666889b01ea78e741b3b32e5
// console.log(jobId);
const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    // console.log(`http://localhost:4000/api/v1/applications/post/${jobId}`);
    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/applications/post/${jobId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
  
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        contact: '',
        gender: '',
        currentLocation: '',
        yearOfGraduation: '',
        experienceYear: '',
        skillSet: '',
        whyYou: '',
      });
  
      toast.success(response.data.message);
    } catch (error) {
      console.error('Error submitting form', error);
      toast.error(error.response.data.message);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-8">
      <div>
        <label className="block mb-2">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter your name"
          required
        />
      </div>
      <div>
        <label className="block mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter your email"
          required
        />
      </div>
      <div>
        <label className="block mb-2">
          Contact <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter your contact number"
          required
        />
      </div>
      <div>
        <label className="block mb-2">Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Prefer Not to Say">Prefer Not to Say</option>
        </select>
      </div>
      <div>
        <label className="block mb-2">
          Current Location <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="currentLocation"
          value={formData.currentLocation}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter your current location"
          required
        />
      </div>
      <div>
        <label className="block mb-2">
          Year of Graduation <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="yearOfGraduation"
          value={formData.yearOfGraduation}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter your graduation year"
          required
        />
      </div>
      <div>
        <label className="block mb-2">
          Years of Experience <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="experienceYear"
          value={formData.experienceYear}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter your years of experience"
          required
        />
      </div>
      <div>
        <label className="block mb-2">
          Skill Set <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="skillSet"
          value={formData.skillSet}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter your skill set"
          required
        />
      </div>
      <div>
        <label className="block mb-2">
          Why You? <span className="text-red-500">*</span>
        </label>
        <textarea
          name="whyYou"
          value={formData.whyYou}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Tell us why we should hire you"
          rows={4}
          required
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Submit Application
      </button>
    </form>
  );
};

export default ApplicationForm;
