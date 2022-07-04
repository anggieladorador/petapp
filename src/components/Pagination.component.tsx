type PaginationProps = {
  pageNumber: number;
  onClick: (index: number) => void;
  activePage: number;
};

const Pagination = ({ pageNumber, onClick, activePage }: PaginationProps) => {
  return (
    <div className="pagination__container">
      {new Array(pageNumber).fill(0).map((_, index) => (
        <button
          className={`step__button ${
            activePage === index && "step__button--active"
          }`}
          onClick={() => onClick(index)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};
export default Pagination;
