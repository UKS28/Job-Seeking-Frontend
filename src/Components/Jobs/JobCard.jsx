import { Link } from 'react-router-dom';

const JobCard = ({ company }) => {
  return (
    <div className="mt-24 mb-4 flex flex-col cursor-pointer border border-gray-200 rounded-md mx-10 p-7 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div className="flex flex-col mb-2">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{company.companyName}</h2>
        <h4 className="text-lg font-light text-gray-500 mb-2">{company.companyMotto}</h4>
        <h6 className="text-md text-gray-600">Company size: {company.employeeCount}</h6>
      </div>
      
      <div className="border rounded-xl bg-green-200 text-sm font-bold p-2 w-44 mb-4 text-center">
        Actively hiring
      </div>

      <div className="flex justify-between items-center mt-2 border rounded-sm p-4 bg-gray-50 text-xl shadow-inner">
        <div className="font-bold text-gray-700">{company.role}</div>
        <div className='flex'>
           <div className="text-gray-600"> •   {company.jobMode}</div>
           <div className="text-gray-600"> •    {company.location}</div>
           <div className="text-gray-600"> •    {company.fixedSalary}</div>
        </div>
        <button className="border rounded-xl p-2 bg-black text-white w-24 hover:bg-blue-700 transition-colors duration-300 ease-in-out">
          <Link to={`/job/${company._id}`}>View</Link>
          
        </button>
      </div>
    </div>
  );
};

export default JobCard;
