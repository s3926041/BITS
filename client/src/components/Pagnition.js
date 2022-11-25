import React from 'react'

export default function Pagnition({para1,para2,t,page}) {
  return (
    <nav aria-label="Page navigation example ">
    <ul className="pagination">
      <li className="page-item">
        <a
          href={`/${para1}/${para2}/${
            parseInt(page) - 1 >= 1 ? 1 : parseInt(page) - 1
          }`}
          className="page-link"
        >
          Previous
        </a>
      </li>
      {[...Array(t)].map((e, i) => {
        return (
          <li className="page-item ">
            <a
              variant="success"
              bg="primary"
              className="page-link"
              href={`/${para1}/${para2}/${i + 1}`}
            >
              {i + 1}
            </a>
          </li>
        );
      })}
      <li className="page-item">
        <a
          className="page-link"
          href={`/${para1}/${para2}/${
            parseInt(page) + 1 <= t ? parseInt(page) + 1 : t
          }`}
        >
          Next
        </a>
      </li>
    </ul>
  </nav>
  )
}
