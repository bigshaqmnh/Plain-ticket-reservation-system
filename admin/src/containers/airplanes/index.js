import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Pagination from 'react-js-pagination';

import CustomInput from '../../components/customInput';
import CustomTable from '../../components/customTable';
import CustomButton from '../../components/customButton';
import CustomAlert from '../../components/customAlert';

import useFetchData from '../../hooks/useFetchData';

import { AlertContext } from '../../context/alert';

import airplaneApi from '../../api/airplane';

import componentStyles from '../../constants/componentStyles';
import { resultsPerPageLimit } from '../../constants/common';

function AirplanesContainer({ location }) {
  const { setAlert, showAlert, setShowAlert } = useContext(AlertContext);

  const { data, dataCount, isLoading, searchText, setSearchText, currentPage, setCurrentPage } = useFetchData(
    airplaneApi.getAirplanes,
    setAlert,
    setShowAlert
  );

  const handleSearchItem = ({ target }) => {
    setSearchText(target.value);
  };

  const renderTable = () =>
    data && data.length ? (
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
    ) : (
      <h1>No Data.</h1>
    );

  return (
    <>
      <div className="above-table">
        <CustomInput
          label="Search"
          name="airplane-search"
          value={searchText}
          placeholder="Search airplanes"
          onChange={handleSearchItem}
        />
        <LinkContainer to={`${location.pathname}/add`}>
          <CustomButton variant={componentStyles.success} text="Add airplane" />
        </LinkContainer>
      </div>
      {isLoading ? <Spinner animation="border" /> : renderTable()}
      {showAlert && <CustomAlert />}
    </>
  );
}

AirplanesContainer.propTypes = {
  location: PropTypes.shape({}).isRequired
};

export default AirplanesContainer;
