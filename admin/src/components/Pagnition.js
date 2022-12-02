import React from "react";

export default function Pagnition({sort,itemPerPage,totalItem,setRequest,curPage}) {
    let totalPage = Math.ceil(totalItem/itemPerPage)
  return (
    <nav aria-label="Page navigation example ">
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link" onClick={()=>{
            let prevPage = curPage == 1? 1 : curPage -1
            setRequest(sort,prevPage)
          }}>Previous</a>
        </li>
        {[...Array(totalPage)].map((e, i) => {
          return (
            <li className="page-item" key={i+1} onClick={()=>{
                setRequest(sort,i+1)
                console.log(sort)
            }}>
              <a  className="page-link"  >
                {i + 1}
              </a>
            </li>
          );
        })}
        <li className="page-item">
          <a className="page-link" onClick={()=>{
            let nextPage = curPage == totalPage? totalPage : curPage + 1
            setRequest(sort,nextPage)
          }}>Next</a>
        </li>
      </ul>
    </nav>
  );
}
