import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'react-bootstrap';

const FIRST_PAGE = 1;
const paginationOffset = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FIVE: 5
};

function CustomPagination(props) {
  const { currentPage, lastPage, handlePagination } = props;

  const createPages = () => {
    const isStart = currentPage <= paginationOffset.THREE;
    const isEnd = currentPage >= lastPage - paginationOffset.THREE;
    let pages = [];

    if (!isStart) {
      pages = pages.concat([
        <Pagination.First name={FIRST_PAGE} />,
        <Pagination.Prev name={currentPage - paginationOffset.ONE} />,
        <Pagination.Item name={FIRST_PAGE}>{FIRST_PAGE}</Pagination.Item>,
        <Pagination.Ellipsis disabled />
      ]);
    }

    let start;
    let end;

    if (isStart && isEnd) {
      start = FIRST_PAGE;
      end = lastPage;
    } else if (isStart) {
      start = FIRST_PAGE;
      end = paginationOffset.FIVE;
    } else if (isEnd) {
      start = lastPage - paginationOffset.FIVE;
      end = lastPage;
    }

    for (
      let page = start || currentPage - paginationOffset.TWO, maxPage = end || currentPage + paginationOffset.TWO;
      page <= maxPage;
      ++page
    ) {
      pages.push(
        page === currentPage ? (
          <Pagination.Item key={page} name={page} active>
            {page}
          </Pagination.Item>
        ) : (
          <Pagination.Item key={page} name={page}>
            {page}
          </Pagination.Item>
        )
      );
    }

    if (!isEnd) {
      pages = pages.concat([
        <Pagination.Ellipsis disabled />,
        <Pagination.Item name={lastPage}>{lastPage}</Pagination.Item>,
        <Pagination.Next name={currentPage + paginationOffset.ONE} />,
        <Pagination.Last name={lastPage} />
      ]);
    }

    return pages;
  };

  return <Pagination onClick={handlePagination}>{createPages()}</Pagination>;
}

CustomPagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  handlePagination: PropTypes.func.isRequired
};

export default CustomPagination;
