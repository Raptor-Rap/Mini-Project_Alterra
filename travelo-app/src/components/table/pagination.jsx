import { Pagination } from "react-bootstrap";

export default function TablePagination(props) {
  const { currentPage, pageCount, onPageChange } = props;

  return (
    <Pagination>
      <Pagination.First
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
        className="green-arrow"
      />
      <Pagination.Prev
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="green-arrow"
      />
      <Pagination.Item disabled active>
        {currentPage}
      </Pagination.Item>
      <Pagination.Next
        disabled={currentPage === pageCount}
        onClick={() => onPageChange(currentPage + 1)}
        className="green-arrow"
      />
      <Pagination.Last
        disabled={currentPage === pageCount}
        onClick={() => onPageChange(pageCount)}
        className="green-arrow"
      />
    </Pagination>
  );
}
