import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';
import { Spinner } from 'react-bootstrap';
import Pagination from 'react-js-pagination';

import FlightForm from './FlightForm';
import CustomInput from '../../components/customInput';
import CustomTable from '../../components/customTable';
import CustomButton from '../../components/customButton';
import CustomAlert from '../../components/customAlert';

import useFetchData from '../../hooks/useFetchData';
import useAlert from '../../hooks/useAlert';

import flightApi from '../../api/flight';

import componentStyles from '../../constants/componentStyles';
import { resultsPerPageLimit } from '../../constants/common';
import screen from '../../constants/screens';

import formatFlights from '../../helpers/formatters/formatFlights';
import getHandlers from '../../helpers/getHandlers';

function FlightsContainer({ history, match }) {
  const { path } = match;

  const { alert, setAlert, showAlert, setShowAlert } = useAlert();

  const {
    items,
    setItems,
    itemsCount,
    isLoading,
    searchText,
    setSearchText,
    currentPage,
    setCurrentPage
  } = useFetchData(flightApi.getFlights, setAlert, setShowAlert);

  const flights = formatFlights(items);

  const [selectedItem, setSelectedItem] = useState(null);

  const screens = {
    [screen.TABLE]: renderTableScreen,
    [screen.DETAILS]: renderDetailsScreen,
    [screen.ADD]: renderAddScreen,
    [screen.EDIT]: renderEditScreen
  };

  const { currentScreen, handleClickItem, handleSearchItem, handleBackAction } = getHandlers({
    path,
    history,
    items: flights,
    setSelectedItem,
    setSearchText
  });

  const handleAddItem = async data => {
    try {
      handleBackAction();

      const { data: newFlight } = await flightApi.addFlight(data);
      const maxPage = Math.ceil(itemsCount / resultsPerPageLimit);

      if (currentPage === maxPage) {
        items.length >= resultsPerPageLimit ? setCurrentPage(maxPage + 1) : setItems([...items, newFlight]);
      } else {
        setCurrentPage(maxPage);
      }

      setAlert({
        variant: componentStyles.success,
        heading: 'Added',
        mainText: 'Flight was successfully added.',
        isShown: setShowAlert
      });
    } catch (err) {
      setAlert({
        variant: componentStyles.error,
        heading: 'Not Added',
        mainText: 'An error occured while adding new flight.',
        isShown: setShowAlert
      });
    } finally {
      setShowAlert(true);
    }
  };

  const handleUpdateItem = async data => {
    try {
      handleBackAction();

      const flightId = selectedItem.id;
      await flightApi.updateFlight(flightId, data);
      const { data: updatedFlight } = await flightApi.getFlight(flightId);

      setItems(items.map(flight => (flight.id === updatedFlight.id ? updatedFlight : flight)));

      setAlert({
        variant: componentStyles.success,
        heading: 'Updated',
        mainText: 'Flight was successfully updated.',
        isShown: setShowAlert
      });
    } catch (err) {
      setAlert({
        variant: componentStyles.error,
        heading: 'Not updated',
        mainText: 'An error occured while updating flight data.',
        isShown: setShowAlert
      });
    } finally {
      setShowAlert(true);
    }
  };

  const renderTable = () => {
    if (!flights || !flights.length) {
      return <h1>No Data.</h1>;
    }

    const items = flights.map(flight => ({
      ...flight,
      departureAirport: flight.departureAirport.name,
      arrivalAirport: flight.arrivalAirport.name,
      airplane: flight.airplane.name
    }));

    return (
      <>
        <CustomTable headers={Object.keys(items[0])} items={items} linkPath={path} onClick={handleClickItem} />
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
    );
  };

  function renderTableScreen() {
    return (
      <>
        <div className="above-table">
          <CustomInput
            type="search"
            label="Search"
            name="flight-search"
            value={searchText}
            placeholder="Search flights"
            onChange={handleSearchItem}
          />
          <LinkContainer to={`${path}/add`}>
            <CustomButton variant={componentStyles.success} text="Add flight" />
          </LinkContainer>
        </div>
        {isLoading ? <Spinner animation="border" /> : renderTable()}
        {showAlert && <CustomAlert {...alert} />}
      </>
    );
  }

  function renderDetailsScreen() {
    return <FlightForm flight={selectedItem} canEdit={false} handleBack={handleBackAction} />;
  }

  function renderAddScreen() {
    return <FlightForm handleSave={handleAddItem} handleBack={handleBackAction} />;
  }

  function renderEditScreen() {
    return <FlightForm flight={selectedItem} handleSave={handleUpdateItem} handleBack={handleBackAction} />;
  }

  return screens[currentScreen]();
}

FlightsContainer.propTypes = {
  history: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({}).isRequired
};

export default FlightsContainer;
