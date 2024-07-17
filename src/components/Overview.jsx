import React from 'react'

const Overview = ({open}) => {
  return (
    <div
    className={`${
      open
        ? "lg:w-[65%]  lg:left-[30%] left-[10rem] w-[60%] sm:left-[15rem] md:w-[70%] sm:w-[62%] xl:w-[79%] xl:left-[20%] xm:w-[68%]"
        : "lg:w-[93%] lg:right-[3%] lg:left-[6%] w-[70%] left-[25%]"
    } absolute   flex-col gap-[24px] lg:top-[4.6rem] xl:top-[5rem] bg-black h-[85vh] rounded-3xl text-white flex justify-center items-center sm:top-[4.9rem] top-[6.9rem]  overflow-hidden`}
  >
     <div className="flex items-center justify-center  text-center">
      <div>
        <div className='mx-auto flex items-center justify-center mb-4 opacity-50' >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm71.87,53.27L136,114.14V40.37A88,88,0,0,1,199.87,77.27ZM120,40.37v83l-71.89,41.5A88,88,0,0,1,120,40.37ZM128,216a88,88,0,0,1-71.87-37.27L207.89,91.12A88,88,0,0,1,128,216Z"></path></svg>

        </div>
        <h2 className="text-xl text-white mb-2">No Data Available</h2>
        <p className="text-zinc-400">There is no undefined available at this time.</p>
      </div>
    </div>
    </div>
  )
}

export default Overview