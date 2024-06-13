import { items } from "../Utils/Constant";

const Companylist = () => {
    
  return (
    <div className=" bg-black text-white h-80 p-4">
        <h1 className="text-center mb-28 text-3xl">Our Partners</h1>
        <div className="flex justify-center  ">
       
      <div className="overflow-hidden w-3/5">
      <div className="flex animate-scroll">
        {items.map((item, index) => (
          <div key={index} className="mx-4 text-3xl ">
            {item}
          </div>
        ))}
      </div>
    </div>
    </div>
    </div>
    
  )
}

export default Companylist
