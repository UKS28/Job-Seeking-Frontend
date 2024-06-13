import { useEffect, useState } from "react";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import axios from "axios";
import JobCard from "./JobCard";
import Shimmer from "../Utils/Shimmer";
const CompanyList = () => {
  // const companies = [
  //     {
  //       sNo: 1,
  //       companyName: "Tech Innovators Inc.",
  //       motto: "Innovate Your Future",
  //       employeeCount: 500,
  //       rolesHiring: ["Software Engineer", "Product Manager", "Data Scientist"],
  //       location: "San Francisco, CA",
  //       workMode: "Remote",
  //       salary: "$90,000 - $150,000"
  //     },
  //     {
  //       sNo: 2,
  //       companyName: "HealthCare Solutions",
  //       motto: "Empowering Health",
  //       employeeCount: 1200,
  //       rolesHiring: ["Healthcare Consultant", "UX Designer", "Business Analyst"],
  //       location: "New York, NY",
  //       workMode: "Hybrid",
  //       salary: "$80,000 - $130,000"
  //     },
  //     {
  //       sNo: 3,
  //       companyName: "Green Energy Corp",
  //       motto: "Powering a Sustainable Future",
  //       employeeCount: 750,
  //       rolesHiring: ["Environmental Engineer", "Marketing Specialist", "Sales Manager"],
  //       location: "Austin, TX",
  //       workMode: "Remote",
  //       salary: "$70,000 - $120,000"
  //     },
  //     {
  //       sNo: 4,
  //       companyName: "FinTech Innovations",
  //       motto: "Revolutionizing Finance",
  //       employeeCount: 600,
  //       rolesHiring: ["Blockchain Developer", "Financial Analyst", "Security Expert"],
  //       location: "Chicago, IL",
  //       workMode: "Hybrid",
  //       salary: "$100,000 - $160,000"
  //     },
  //     {
  //       sNo: 5,
  //       companyName: "EdTech Pioneers",
  //       motto: "Educate to Elevate",
  //       employeeCount: 400,
  //       rolesHiring: ["Curriculum Developer", "Frontend Developer", "Customer Support"],
  //       location: "Seattle, WA",
  //       workMode: "Remote",
  //       salary: "$60,000 - $110,000"
  //     },
  //     {
  //       sNo: 6,
  //       companyName: "Urban Design Studios",
  //       motto: "Designing Better Cities",
  //       employeeCount: 200,
  //       rolesHiring: ["Urban Planner", "Graphic Designer", "Project Manager"],
  //       location: "Los Angeles, CA",
  //       workMode: "Hybrid",
  //       salary: "$50,000 - $100,000"
  //     },
  //     {
  //       sNo: 7,
  //       companyName: "Global E-commerce Solutions",
  //       motto: "Connecting the World",
  //       employeeCount: 1500,
  //       rolesHiring: ["Logistics Coordinator", "Software Tester", "Marketing Manager"],
  //       location: "Miami, FL",
  //       workMode: "Remote",
  //       salary: "$55,000 - $105,000"
  //     },
  //     {
  //       sNo: 8,
  //       companyName: "Cyber Security Experts",
  //       motto: "Secure Your Digital World",
  //       employeeCount: 850,
  //       rolesHiring: ["Penetration Tester", "IT Support", "Network Engineer"],
  //       location: "Boston, MA",
  //       workMode: "Hybrid",
  //       salary: "$95,000 - $155,000"
  //     },
  //     {
  //       sNo: 9,
  //       companyName: "Creative Media Agency",
  //       motto: "Creating Impactful Stories",
  //       employeeCount: 300,
  //       rolesHiring: ["Content Writer", "Video Editor", "Social Media Manager"],
  //       location: "Denver, CO",
  //       workMode: "Remote",
  //       salary: "$45,000 - $85,000"
  //     },
  //     {
  //       sNo: 10,
  //       companyName: "AI Research Labs",
  //       motto: "Innovating Intelligence",
  //       employeeCount: 950,
  //       rolesHiring: ["AI Researcher", "Data Engineer", "Machine Learning Specialist"],
  //       location: "San Diego, CA",
  //       workMode: "Hybrid",
  //       salary: "$110,000 - $180,000"
  //     }
  //   ];

  const [companiesData, setCompaniesData] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get(
        "https://job-seeking-backend-e4fu.onrender.com/api/v1/jobs/getall"
      );
      setCompaniesData(response.data.jobs);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (companiesData.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Shimmer />
      </div>
    );
  }
  return (
    <>
      <Header />
      {companiesData.length > 0 &&
        companiesData.map((company, index) => (
          <JobCard key={index} company={company} />
        ))}
      <Footer />
    </>
  );
};

export default CompanyList;
