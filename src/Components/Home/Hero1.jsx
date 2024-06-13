import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";
import heroS from '../../assets/heroS.jpg'
const Hero1 = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <>
    <div className="flex flex-col py-24 md:py-0 my-28">
      <div className="min-w-screen-xl max-w-screen-xl mx-auto flex h-72 mb-7">
        <div className="flex flex-col justify-center flex-1">
          <h1 className="max-w-full text-4xl md:max-w-600  mt-6">Find a job that suits</h1>
          <h1 className="max-w-full text-4xl md:max-w-600  mt-6">your interests and skills</h1>
          <p className="max-w-full md:max-w-600  mt-6 text-base md:text-lg lg:text-xl xl:text-2xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            voluptate repellat modi quidem aliquid eaque ducimus ipsa et,
            facere mollitia!
          </p>
        </div>
        <div className="overflow-hidden">
          <img className="w-full h-full" src={heroS} alt="hero" />
        </div>
      </div>
      <div className="flex justify-between py-12 min-w-screen-xl max-w-screen-xl mx-16">
        {details.map((element) => {
          return (
            <div className="group flex gap-5 items-center bg-gray-200 w-56 p-2 transition-all duration-300 group-hover:shadow-lg" key={element.id}>

              <div className="text-lg bg-blue-200 flex items-center justify-center p-4 text-blue-800">{element.icon}</div>
              <div className="content">
                <p className="font-bold">{element.title}</p>
                <p className="text-gray-500 text-sm mt-5">{element.subTitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </>
  )
}

export default Hero1

