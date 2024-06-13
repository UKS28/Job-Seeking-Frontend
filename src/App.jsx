import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import Login from "./Components/Authetication/Login";
import Register from "./Components/Authetication/Register";
import Alljobs from "./Components/Jobs/Alljobs";
import SingleJob from "./Components/Jobs/SingleJob";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import { Context } from "./main";
import axios from "axios";
import PostJob from "./Components/Jobs/PostJob";
import MyJobstenp from "./Components/Jobs/MyJobstenp";
import ApplicationForm from "./Components/Application/ApplicationForm";
import MyApplication from "./Components/Application/MyApplication";
import Applications from "./Components/Application/Applications";
import Error from "./Components/Utils/Error";
function App() {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://job-seeking-backend-e4fu.onrender.com/api/v1/users/getuser",
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/all-jobs" element={<Alljobs />} />
        <Route path="/job/:jobId" element={<SingleJob />} />

        {/* employee routes */}
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/my-jobs/" element={<MyJobstenp />} />
        <Route path="application/:jobId" element={<Applications />} />

        {/* user routes */}
        <Route path="/my-application/" element={<MyApplication />} />
        <Route path="/application-form/:jobId" element={<ApplicationForm />} />

        {/* error */}
        <Route path="/*" element={<Error />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
