import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Pagination from 'react-js-pagination';

import AirportForm from './AirportForm';
import CustomInput from '../../components/customInput';
import CustomTable from '../../components/customTable';
import CustomButton from '../../components/customButton';
import CustomAlert from '../../components/customAlert';

import useFetchData from '../../hooks/useFetchData';
import useAlert from '../../hooks/useAlert';

import airportApi from '../../api/airport';

import componentStyles from '../../constants/componentStyles';
import { resultsPerPageLimit } from '../../constants/common';
import screen from '../../constants/screens';

import getHandlers from '../../helpers/getHandlers';

function AirportsContainer() {
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
  } = useFetchData(airportApi.getAirports, setAlert, setShowAlert);

  const [selectedItem, setSelectedItem] = useState(null);

  const screens = {
    [screen.TABLE]: renderTableScreen,
    [screen.DETAILS]: renderDetailsScreen,
    [screen.ADD]: renderAddScreen
  };

  const [currentScreen, setCurrentScreen] = useState(screen.TABLE);

  const { handleClickItem, handleSearchItem, handleShowAddScreen, handleBackAction } = getHandlers({
    items,
    setSelectedItem,
    setCurrentScreen,
    setSearchText
  });

  const handleAddItem = async data => {
    try {
      handleBackAction();

      const { data: newAirport } = await airportApi.addAirport(data);
      const maxPage = Math.ceil(itemsCount / resultsPerPageLimit);

      if (currentPage === maxPage) {
        items.length >= resultsPerPageLimit ? setCurrentPage(maxPage + 1) : setItems([...items, newAirport]);
      } else {
        setCurrentPage(maxPage);
      }

      setAlert({
        variant: componentStyles.success,
        heading: 'Added',
        mainText: 'Airport was successfully added.',
        isShown: setShowAlert
      });
    } catch (err) {
      setAlert({
        variant: componentStyles.error,
        heading: 'Not Added',
        mainText: 'An error occured while adding new airport.',
        isShown: setShowAlert
      });
    } finally {
      setShowAlert(true);
    }
  };

  const renderTable = () =>
    items && items.length ? (
      <>
        <CustomTable headers={Object.keys(items[0])} items={items} onClick={handleClickItem} />
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
        <div className="above-table">
          <CustomInput
            label="Search"
            name="airport-search"
            value={searchText}
            placeholder="Search airports"
            onChange={handleSearchItem}
          />
          <CustomButton variant={componentStyles.success} text="Add airport" onClick={handleShowAddScreen} />
        </div>
        {isLoading ? <Spinner animation="border" /> : renderTable()}
        {showAlert && <CustomAlert {...alert} />}
      </>
    );
  }

  function renderDetailsScreen() {
    return <AirportForm airport={selectedItem} canEdit={false} handleBack={handleBackAction} />;
  }

  function renderAddScreen() {
    return <AirportForm handleSave={handleAddItem} handleBack={handleBackAction} />;
  }

  return screens[currentScreen]();
}

export default AirportsContainer;
