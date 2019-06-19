import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'react-bootstrap';

const FIRST_PAGE = 1;
const offset = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FIVE: 5
};

function CustomPagination(props) {
  const { currentPage, lastPage, handlePagination } = props;

  const createPages = () => {
    const isFirst = currentPage <= offset.THREE;
    const isLast = currentPage >= lastPage - offset.THREE;
    let pages = [];

    if (!isFirst) {
      pages = pages.concat([
        <Pagination.First name={FIRST_PAGE} />,
        <Pagination.Prev name={currentPage - offset.ONE} />,
        <Pagination.Item name={FIRST_PAGE}>{FIRST_PAGE}</Pagination.Item>,
        <Pagination.Ellipsis disabled />
      ]);
    }

    let start;
    let end;

    if (isFirst && isLast) {
      start = FIRST_PAGE;
      end = lastPage;
    } else if (isFirst) {
      start = FIRST_PAGE;
      end = offset.FIVE;
    } else if (isLast) {
      start = lastPage - offset.FIVE;
      end = lastPage;
    }

    for (
      let page = start || currentPage - offset.TWO, maxPage = end || currentPage + offset.TWO;
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

    if (!isLast) {
      pages = pages.concat([
        <Pagination.Ellipsis disabled />,
        <Pagination.Item name={lastPage}>{lastPage}</Pagination.Item>,
        <Pagination.Next name={currentPage + offset.ONE} />,
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
