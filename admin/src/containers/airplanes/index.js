import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';

import AirplaneDetails from './AirplaneDetails';
import AirplaneAdd from './AirplaneAdd';
import CustomInput from '../../components/customInput';
import CustomTable from '../../components/customTable';
import CustomPagination from '../../components/customPagination';
import CustomButton from '../../components/customButton';
import CustomAlert from '../../components/customAlert';

import useFetchData from '../../hooks/useFetchData';
import useAlert from '../../hooks/useAlert';

import { airplaneApi } from '../../api';

import componentStyles from '../../constants/componentStyles';
import { resultsPerPageLimit } from '../../constants/common';

function AirplanesContainer() {
  const {
    items: airplanes,
    setItems: setAirplanes,
    isLoading,
    searchText,
    setSearchText,
    currentPage,
    setCurrentPage,
    maxPage
  } = useFetchData(airplaneApi.getAirplanes);

  const { alert, setAlert, showAlert, setShowAlert } = useAlert();

  const [selectedAirplane, setSelectedAirplane] = useState(null);
  const [showInfoScreen, setShowInfoScreen] = useState(false);
  const [showAddScreen, setShowAddScreen] = useState(false);

  const handleClick = event => {
    const { id } = event.currentTarget;
    const selected = airplanes.find(airplane => airplane.id === +id);

    setSelectedAirplane(selected);
    setShowInfoScreen(true);
  };

  const handleBack = () => {
    showInfoScreen && setShowInfoScreen(false);
    showAddScreen && setShowAddScreen(false);
  };

  const handleSearch = ({ target }) => {
    setSearchText(target.value);
  };

  const handlePagination = ({ target }) => {
    const selectedPage = +target.name || +target.parentNode.name;

    if (selectedPage) {
      setCurrentPage(selectedPage);
    }
  };

  const handleSave = async data => {
    try {
      handleBack();

      const newAirplane = await airplaneApi.addAirplane(data);

      setCurrentPage(airplanes.length >= resultsPerPageLimit ? maxPage + 1 : maxPage);

      if (currentPage === maxPage) {
        setAirplanes([...airplanes, newAirplane]);
      }

      setAlert({
        variant: componentStyles.success,
        heading: 'Saved',
        mainText: 'Airplane was successfully saved.',
        isShown: setShowAlert
      });
    } catch (err) {
      setAlert({
        variant: componentStyles.error,
        heading: 'Not Saved',
        mainText: 'An error occured while saving airplane data.',
        isShown: setShowAlert
      });
    } finally {
      setShowAlert(true);
    }
  };

  const handleAdd = () => setShowAddScreen(true);

  const renderTable = () =>
    airplanes && airplanes.length ? (
      <>
        <CustomTable headers={Object.keys(airplanes[0])} items={airplanes} onClick={handleClick} />
        {maxPage > 1 && (
          <CustomPagination
            currentPage={currentPage}
            lastPage={maxPage}
            isLarge={maxPage >= resultsPerPageLimit}
            handlePagination={handlePagination}
          />
        )}
      </>
    ) : (
      <h1>No Data.</h1>
    );

  const renderPage = () => (
    <>
      <CustomInput
        label="Search"
        name="airplane-search"
        value={searchText}
        placeholder="Search airplanes"
        onChange={handleSearch}
      />
      <CustomButton variant={componentStyles.success} text="Add airplane" onClick={handleAdd} />
      {isLoading ? <Spinner animation="border" variant={componentStyles.default} /> : renderTable()}
      {showAlert && <CustomAlert {...alert} />}
    </>
  );

  const renderScreen = () =>
    showInfoScreen ? (
      <AirplaneDetails
        name={selectedAirplane.name}
        type={selectedAirplane.type}
        maxLuggageCarryWeight={selectedAirplane.maxLuggageCarryWeight}
        handleBack={handleBack}
      />
    ) : (
      <AirplaneAdd handleSave={handleSave} handleBack={handleBack} />
    );

  return showInfoScreen || showAddScreen ? renderScreen() : renderPage();
}

export default AirplanesContainer;
