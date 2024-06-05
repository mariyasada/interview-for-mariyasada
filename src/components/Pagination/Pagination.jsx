import React from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import "./Pagination.css";

const Pagination = ({ totalPages, setCurrentPage, currentPage }) => {
  const getPaginationGroup = () => {
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage === 1) {
      endPage = Math.min(totalPages - 1, 2);
    }

    if (currentPage === totalPages) {
      startPage = Math.max(2, totalPages - 2);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <>
      {totalPages > 1 ? (
        <div className="paginationcontainer">
          <button
            className={`btn-paginate ${
              currentPage === 1 ? "disabled-cursor" : "cursor"
            }`}
            onClick={() =>
              currentPage !== 1 &&
              setCurrentPage((currentPage) => currentPage - 1)
            }
          >
            <IoIosArrowBack />
          </button>

          <button
            className={`btn-paginate ${
              currentPage === 1 ? "primary-btn" : "secondary-btn"
            }`}
            onClick={() => setCurrentPage(1)}
          >
            1
          </button>

          {currentPage > 3 && (
            <button className="ellipsis btn-paginate">...</button>
          )}

          {getPaginationGroup().map((page) => (
            <button
              key={page}
              className={`btn-paginate ${
                currentPage === page ? "primary-btn" : "secondary-btn"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

          {currentPage < totalPages - 2 && (
            <button className="ellipsis btn-paginate">...</button>
          )}

          {totalPages > 1 && (
            <button
              className={`btn-paginate ${
                currentPage === totalPages ? "primary-btn" : "secondary-btn"
              }`}
              onClick={() => setCurrentPage(totalPages)}
            >
              {totalPages}
            </button>
          )}

          <button
            className={`btn-paginate ${
              currentPage === totalPages ? "disabled-cursor" : "cursor"
            }`}
            onClick={() =>
              currentPage !== totalPages && setCurrentPage(currentPage + 1)
            }
            style={{ border: "none" }}
          >
            <IoIosArrowForward />
          </button>
        </div>
      ) : null}
    </>
  );
};

export default Pagination;
