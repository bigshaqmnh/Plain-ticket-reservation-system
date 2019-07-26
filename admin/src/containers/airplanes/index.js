import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Pagination from 'react-js-pagination';

import CustomInput from '../../components/customInput';
import CustomTable from '../../components/customTable';
import CustomButton from '../../components/customButton';
import CustomAlert from '../../components/customAlert';

import useFetchData from '../../hooks/useFetchData';
import useAlert from '../../hooks/useAlert';

import airplaneApi from '../../api/airplane';

import componentStyles from '../../constants/componentStyles';
import { resultsPerPageLimit } from '../../constants/common';

function AirplanesContainer({ location }) {
  const { alert, setAlert, showAlert, setShowAlert } = useAlert();

  const { items, itemsCount, isLoading, searchText, setSearchText, currentPage, setCurrentPage } = useFetchData(
    airplaneApi.getAirplanes,
    setAlert,
    setShowAlert
  );

  const handleSearchItem = ({ target }) => {
    setSearchText(target.value);
  };

  const renderTable = () =>
    items && items.length ? (
      <>
        <CustomTable headers={Object.keys(items[0])} items={items} linkPath={location.pathname} />
        {itemsCount > resultsPerPageLimit && (
          <Pagination
            itemClass="page-item"
            linkClass="page-link"
            activePage={currentPage}
            totalItemsCount={itemsCount}
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
      {showAlert && <CustomAlert {...alert} />}
    </>
  );
}

AirplanesContainer.propTypes = {
  location: PropTypes.shape({}).isRequired
};

export default AirplanesContainer;
