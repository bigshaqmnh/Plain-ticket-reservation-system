import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Pagination from 'react-js-pagination';

import FlightDetails from './FlightDetails';
import FlightAdd from './FlightAdd';
import FlightEdit from './FlightEdit';
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

function FlightsContainer() {
  const {
    items,
    setItems,
    itemsCount,
    isLoading,
    searchText,
    setSearchText,
    currentPage,
    setCurrentPage
  } = useFetchData(flightApi.getFlights);

  const flights = formatFlights(items);

  const { alert, setAlert, showAlert, setShowAlert } = useAlert();

  const [selectedItem, setSelectedItem] = useState(null);

  const screens = {
    [screen.TABLE]: renderTableScreen,
    [screen.DETAILS]: renderDetailsScreen,
    [screen.ADD]: renderAddScreen,
    [screen.EDIT]: renderEditScreen
  };

  const [currentScreen, setCurrentScreen] = useState(screen.TABLE);

  const {
    handleClickItem,
    handleSearchItem,
    handleShowAddScreen,
    handleShowEditScreen,
    handleBackAction
  } = getHandlers({
    items: flights,
    setSelectedItem,
    setCurrentScreen,
    setSearchText
  });

  const handleAddItem = async data => {
    try {
      handleBackAction();

      const newFlight = await flightApi.addFlight(data);
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

      const updatedFlight = await flightApi.updateFlight(data);

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

  const renderTable = () =>
    flights && flights.length ? (
      <>
        <CustomTable headers={Object.keys(flights[0])} items={flights} onClick={handleClickItem} />
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

  function renderTableScreen() {
    return (
      <>
        <CustomInput
          type="search"
          label="Search"
          name="flight-search"
          value={searchText}
          placeholder="Search flights"
          onChange={handleSearchItem}
        />
        <CustomButton variant={componentStyles.success} text="Add flight" onClick={handleShowAddScreen} />
        {isLoading ? <Spinner animation="border" variant={componentStyles.default} /> : renderTable()}
        {showAlert && <CustomAlert {...alert} />}
      </>
    );
  }

  function renderDetailsScreen() {
    return <FlightDetails flight={selectedItem} handleBack={handleBackAction} handleEdit={handleShowEditScreen} />;
  }

  function renderAddScreen() {
    return <FlightAdd handleBack={handleBackAction} handleSave={handleAddItem} />;
  }

  function renderEditScreen() {
    return <FlightEdit flight={selectedItem} handleBack={handleBackAction} handleSave={handleUpdateItem} />;
  }

  return screens[currentScreen]();
}

export default FlightsContainer;
