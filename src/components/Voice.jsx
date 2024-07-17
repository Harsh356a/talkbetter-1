import React from 'react'

const Voice = ({open}) => {
  return (
    <div
    className={`${
      open
        ? "lg:w-[65%] lg:left-[30%] left-[10rem] w-[60%] sm:left-[15rem] md:w-[70%] sm:w-[62%] xl:w-[75%] xl:left-[23%] xm:w-[68%]"
        : "lg:w-[89%] lg:left-[10%] w-[70%] left-[25%]"
    } fixed  gap-[24px] lg:top-[4.6rem] xl:top-[5rem] bg-black h-[85vh] rounded-3xl text-white   w-64 top-[6.9rem] sm:top-[4.9rem] `}
  >
    <div className="flex flex-1 h-full">
      <div className="overflow-y-auto">
        <div className="flex flex-col p-4 sticky top-0 bg-background gap-2">
          <div className="flex gap-2">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus:border outline-1 outline-ring focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 flex-1">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <path
                  d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
              New Tool
            </button>
          </div>
          <input
            placeholder="Search all columns..."
            className="flex h-9 w-full rounded-md text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 bg-transparent p-2 font-lg shadow border border-input"
          />
        </div>
        <div className="-mt-2">
          <div
            role="list"
            data-testid="assistants-list"
            className="flex flex-col w-[320px] p-4 overflow-auto"
          ></div>
        </div>
      </div>
      <div orientation="vertical" className="sc-jTQCzO iaoTAs"></div>
      <div className="flex flex-1 justify-center items-center">
        <div
          className="text-center text-muted-foreground"
          style={{ opacity: 1, transform: "none" }}
        >
          <div className="flex justify-center">
            <svg
              width="3.13477"
              height="18.7012"
              viewBox="0 0 3.13477 18.7012"
              fill="'none' || '#000000'"
              stroke="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mb-2 w-[100px] h-[100px] fill-white/20"
            >
              <g>
                <rect
                  height="18.7012"
                  opacity="0"
                  width="3.13477"
                  x="0"
                  y="0"
                ></rect>
                <path
                  d="M1.39648 13.3203C1.91406 13.3203 2.26562 12.9785 2.27539 12.4512L2.36328 1.07422C2.36328 1.07422 2.36328 1.07422 2.36328 1.07422C2.36328 0.517578 1.91406 0.136719 1.38672 0.136719C0.859375 0.136719 0.410156 0.517578 0.410156 1.07422C0.410156 1.07422 0.410156 1.07422 0.410156 1.07422L0.517578 12.4512C0.527344 12.9785 0.878906 13.3203 1.39648 13.3203ZM1.38672 18.7012C2.1582 18.7012 2.77344 18.0762 2.77344 17.3145C2.77344 16.543 2.1582 15.9277 1.38672 15.9277C0.625 15.9277 0 16.543 0 17.3145C0 18.0762 0.625 18.7012 1.38672 18.7012Z"
                  fillOpacity="0.85"
                ></path>
              </g>
            </svg>
          </div>
          <h2 className="text-2xl font-medium text-white"></h2>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Voice