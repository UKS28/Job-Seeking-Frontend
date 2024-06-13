import  { dataJobSeeker,dataEmployee} from '../Utils/Constant'
const Hero2 = () => {
 
  return (
    <>
      <h1 className="text-4xl font-bold text-center mt-10 mb-8">About Us</h1>
      <div className="flex flex-col md:flex-row justify-between space-y-6 md:space-x-6 mx-6 py-3">
        {/* Job Seeker */}
        <div className="flex-1 flex flex-col bg-white p-6 shadow-md rounded-lg">
          <div className="mx-auto font-bold text-lg text-gray-700">Got Talent?</div>
          <h1 className="mx-auto text-2xl md:text-3xl font-bold my-6 text-gray-900 text-center">Why job seekers love us</h1>
          {dataJobSeeker.map((item, index) => (
            <div key={index} className="flex items-center m-2 space-x-3">
              <div className="h-12 w-12 border rounded-full p-2 bg-orange-200 flex items-center justify-center">
                <img src={item.src} alt="" className="h-full w-full object-contain" />
              </div>
              <p className="text-gray-600">{item.content}</p>
            </div>
          ))}
        </div>

        {/* Recruiters */}
        <div className="flex-1 flex flex-col bg-gray-100 p-6 shadow-md rounded-lg m-0">
          <div className="mx-auto font-bold text-lg text-gray-700">Need Talent?</div>
          <h1 className="mx-auto text-2xl md:text-3xl font-bold my-6 text-gray-900 text-center">Why recruiters love us</h1>
          {dataEmployee.map((item, index) => (
            <div key={index} className="flex items-center m-2 space-x-3">
              <div className="h-12 w-12 border rounded-full p-2 bg-blue-200 flex items-center justify-center">
                <img src={item.src} alt="" className="h-full w-full object-contain" />
              </div>
              <p className="text-gray-600">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Hero2;
