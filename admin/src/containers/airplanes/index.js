import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Pagination from 'react-js-pagination';

import CustomInput from '../../components/customInput';
import CustomTable from '../../components/customTable';
import CustomButton from '../../components/customButton';

import useFetchData from '../../hooks/useFetchData';

import { AlertContext } from '../../context/alert';

import airplaneApi from '../../api/airplane';

import componentStyles from '../../constants/componentStyles';
import { resultsPerPageLimit } from '../../constants/common';

function AirplanesContainer({ location }) {
  const { setAlert, setShowAlert } = useContext(AlertContext);

  const { data, dataCount, isLoading, searchText, currentPage, setCurrentPage, handleSearch } = useFetchData({
    apiMethod: airplaneApi.getAll,
    setAlert,
    setShowAlert
  });

  const renderTable = () => {
    if (!data || !data.length) {
      return <h1>No Data.</h1>;
    }

    const tableHeaders = Object.keys(data[0]);

    return (
      <>
        <CustomTable headers={tableHeaders} items={data} linkPath={location.pathname} />
        {dataCount > resultsPerPageLimit && (
          <Pagination
            itemClass="page-item"
            linkClass="page-link"
            activePage={currentPage}
            totalItemsCount={dataCount}
            onChange={setCurrentPage}
            hideDisabled
          />
        )}
      </>
    );
  };

  return (
    <>
      <div className="above-table">
        <CustomInput
          label="Search"
          name="airplane-search"
          value={searchText}
          placeholder="Search by name or type"
          onChange={handleSearch}
        />
        <LinkContainer to={`${location.pathname}/add`}>
          <CustomButton variant={componentStyles.success} text="Add airplane" />
        </LinkContainer>
      </div>
      {isLoading ? <Spinner animation="border" /> : renderTable()}
    </>
  );
}

AirplanesContainer.propTypes = {
  location: PropTypes.shape({}).isRequired
};

export default AirplanesContainer;
