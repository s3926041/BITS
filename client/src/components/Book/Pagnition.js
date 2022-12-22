import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
export default function Pagnition({sort,itemPerPage,totalItem,setRequest,curPage}) {
    let totalPage = Math.ceil(totalItem/itemPerPage)
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
     
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          onClick={()=>{
            let prevPage = curPage == 1? 1 : curPage -1
            setRequest(sort,prevPage)
          }}
        >
          
          Previous
        </a>
        
        <a
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">

        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
              onClick={()=>{
                let prevPage = curPage == 1? 1 : curPage -1
                setRequest(sort,prevPage)
              }}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
       
            {[...Array(totalPage)].map((e, i) => {
          return (
            <a
            key={i}
              href="#"
              className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
              onClick={()=>{
                setRequest(sort,i+1)
                console.log(sort)
            }}
            >
              {i + 1}
            </a>
          );
        })}
           
            <a
              className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
              onClick={()=>{
                let nextPage = curPage == totalPage? totalPage : curPage + 1
                setRequest(sort,nextPage)
              }}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
    
  );
}
