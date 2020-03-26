import React from 'react'

const Pagination = ({totalPages, currentPage, onClickPage}) => {

  const SHOW_PER_PAGE = 5

  const getPagesArray = () => {
    if (totalPages < SHOW_PER_PAGE) {return Array.from(Array(totalPages), (_,x) => x+1)}
    let start = 1
    if (currentPage - 2 > 1) {start = currentPage - 2}
    if (currentPage + 2 > totalPages) {start = currentPage - 2 + (totalPages - currentPage)}

    return Array.from(Array(SHOW_PER_PAGE), (_,x) => x+start) 
  }

  return (
    <nav aria-label="Page navigation example" className="mt-2">
      <ul className="pagination justify-content-center">
      { currentPage > SHOW_PER_PAGE &&
        <li className="page-item">
          <span className="page-link" onClick={() => onClickPage(currentPage-1)}>Previous</span>
        </li>
      }
      {
        getPagesArray()
        .map((page, _) => 
        <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
          <span className="page-link" onClick={() => onClickPage(page)}>{page}</span>
        </li>)
      }
      { currentPage+2 < totalPages && 
        <li className="page-item">
          <span className="page-link" onClick={() => onClickPage(currentPage+1)}>Next</span>
        </li>
      }
      </ul>
    </nav>
  )
}

export default Pagination
