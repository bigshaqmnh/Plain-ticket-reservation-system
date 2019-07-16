import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Pagination from 'react-js-pagination';

import AirplaneForm from './AirplaneForm';
import CustomInput from '../../components/customInput';
import CustomTable from '../../components/customTable';
import CustomButton from '../../components/customButton';
import CustomAlert from '../../components/customAlert';

import useFetchData from '../../hooks/useFetchData';
import useAlert from '../../hooks/useAlert';

import airplaneApi from '../../api/airplane';

import componentStyles from '../../constants/componentStyles';
import { resultsPerPageLimit } from '../../constants/common';
import screen from '../../constants/screens';

import getHandlers from '../../helpers/getHandlers';

function AirplanesContainer() {
  const {
    items,
    setItems,
    itemsCount,
    isLoading,
    searchText,
    setSearchText,
    currentPage,
    setCurrentPage
  } = useFetchData(airplaneApi.getAirplanes);

  const { alert, setAlert, showAlert, setShowAlert } = useAlert();

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

      const newAirplane = await airplaneApi.addAirplane(data);
      const maxPage = Math.ceil(itemsCount / resultsPerPageLimit);

      if (currentPage === maxPage) {
        items.length >= resultsPerPageLimit ? setCurrentPage(maxPage + 1) : setItems([...items, newAirplane]);
      } else {
        setCurrentPage(maxPage);
      }

      setAlert({
        variant: componentStyles.success,
        heading: 'Added',
        mainText: 'Airplane was successfully added.',
        isShown: setShowAlert
      });
    } catch (err) {
      setAlert({
        variant: componentStyles.error,
        heading: 'Not Added',
        mainText: 'An error occured while adding new airplane.',
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
            name="airplane-search"
            value={searchText}
            placeholder="Search airplanes"
            onChange={handleSearchItem}
          />
          <CustomButton variant={componentStyles.success} text="Add airplane" onClick={handleShowAddScreen} />
        </div>
        {isLoading ? <Spinner animation="border" /> : renderTable()}
        {showAlert && <CustomAlert {...alert} />}
      </>
    );
  }

  // function renderDetailsScreen() {
  //   return <AirplaneDetails airplane={selectedItem} handleBack={handleBackAction} />;
  // }

  // function renderAddScreen() {
  //   return <AirplaneAdd handleSave={handleAddItem} handleBack={handleBackAction} />;
  // }

  function renderDetailsScreen() {
    return <AirplaneForm airplane={selectedItem} handleBack={handleBackAction} />;
  }

  function renderAddScreen() {
    return <AirplaneForm handleSave={handleAddItem} handleBack={handleBackAction} />;
  }

  return screens[currentScreen]();
}

export default AirplanesContainer;
