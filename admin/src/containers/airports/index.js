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

import airportApi from '../../api/airport';

import componentStyles from '../../constants/componentStyles';
import { resultsPerPageLimit } from '../../constants/common';

function AirportsContainer({ location }) {
  const { setAlert, setShowAlert } = useContext(AlertContext);

  const { data, dataCount, isLoading, searchText, currentPage, setCurrentPage, handleSearch } = useFetchData({
    apiMethod: airportApi.getAll,
    setAlert,
    setShowAlert
  });

  const renderTable = () => {
    if (!data || !data.length) {
      return <h1>No Data.</h1>;
    }

    return (
      <>
        <CustomTable headers={Object.keys(data[0])} items={data} linkPath={location.pathname} />
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
          name="airport-search"
          value={searchText}
          placeholder="Search by name, country or city"
          onChange={handleSearch}
        />
        <LinkContainer to={`${location.pathname}/add`}>
          <CustomButton variant={componentStyles.success} text="Add airport" />
        </LinkContainer>
      </div>
      {isLoading ? <Spinner animation="border" /> : renderTable()}
    </>
  );
}

AirportsContainer.propTypes = {
  location: PropTypes.shape({}).isRequired
};

export default AirportsContainer;
