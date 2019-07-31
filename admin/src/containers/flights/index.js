import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';
import { Spinner } from 'react-bootstrap';
import Pagination from 'react-js-pagination';

import CustomInput from '../../components/customInput';
import CustomTable from '../../components/customTable';
import CustomButton from '../../components/customButton';

import useFetchData from '../../hooks/useFetchData';

import { AlertContext } from '../../context/alert';

import flightApi from '../../api/flight';

import componentStyles from '../../constants/componentStyles';
import { resultsPerPageLimit } from '../../constants/common';

import formatFlights from '../../helpers/formatters/formatFlights';

function FlightsContainer({ location }) {
  const { setAlert, setShowAlert } = useContext(AlertContext);

  const { data, dataCount, isLoading, searchText, currentPage, setCurrentPage, handleSearch } = useFetchData({
    apiMethod: flightApi.getAll,
    setAlert,
    setShowAlert
  });

  const flights = formatFlights(data);

  const renderTable = () => {
    if (!flights || !flights.length) {
      return <h1>No Data.</h1>;
    }

    const data = flights.map(flight => ({
      ...flight,
      departureAirport: flight.departureAirport.name,
      arrivalAirport: flight.arrivalAirport.name,
      airplane: flight.airplane.name
    }));

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
          type="search"
          label="Search"
          name="flight-search"
          value={searchText}
          placeholder="Search by airport name"
          onChange={handleSearch}
        />
        <LinkContainer to={`${location.pathname}/add`}>
          <CustomButton variant={componentStyles.success} text="Add flight" />
        </LinkContainer>
      </div>
      {isLoading ? <Spinner animation="border" /> : renderTable()}
    </>
  );
}

FlightsContainer.propTypes = {
  location: PropTypes.shape({}).isRequired
};

export default FlightsContainer;
