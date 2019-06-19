import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

import AirplaneDetails from './details';
import AirplaneAdd from './add';
import CustomInput from '../../components/customInput';
import CustomTable from '../../components/customTable';
import CustomPagination from '../../components/customPagination';
import CustomAlert from '../../components/customAlert';
import componentStyles from '../../constants/componentStyles';
import { airplaneApi } from '../../api';
import CustomButton from '../../components/customButton';

function AirplanesContainer() {
  const [airplanes, setAirplanes] = useState([]);
  const [selectedAirplane, setSelectedAirplane] = useState(null);
  const [page, setPage] = useState({ current: 1, next: 1 });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const [showInfoScreen, setShowInfoScreen] = useState(false);
  const [showAddScreen, setShowAddScreen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [searchText, setSearchText] = useState('');
  const [alert, setAlert] = useState({});

  const fetchAirplanes = async params => {
    try {
      const airplaneData = await airplaneApi.getAirplanes(params);
      const { data, count, nextPage } = airplaneData;

      setAirplanes(data);
      setPage({ current: nextPage - 1, next: nextPage, total: Math.ceil(count / 10) });
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchAirplanes({ page: page.next });
  }, [searchText, isSaved]);

  const handleClick = event => {
    const { id } = event.currentTarget;
    const selected = airplanes.find(airplane => airplane.id === +id);

    setSelectedAirplane(selected);
    setShowInfoScreen(true);
  };

  const handleBack = () => {
    setShowInfoScreen(false);
    setShowAddScreen(false);
  };

  const handleSearch = ({ target }) => {
    setPage({ next: 1 });
    setSearchText(target.value);
  };

  const handlePagination = ({ target }) => {
    const selectedPage = +target.name || +target.parentNode.name;

    if (selectedPage) {
      setIsLoading(true);
      fetchAirplanes({ page: selectedPage });
    }
  };

  const handleSave = async data => {
    console.log('data: ', data);
    setShowAddScreen(false);
    const save = await airplaneApi.addAirplane(data);

    if (save) {
      setIsSaved(true);
      setAlert({
        variant: componentStyles.success,
        heading: 'Saved',
        mainText: 'Airplane was successfully saved.',
        isShown: setShowAlert
      });
    } else {
      setAlert({
        variant: componentStyles.error,
        heading: 'Not Saved',
        mainText: 'An error occured while saving airplane data.',
        isShown: setShowAlert
      });
    }
    setShowAlert(true);
  };

  const handleAdd = () => setShowAddScreen(true);

  const renderTable = () =>
    airplanes.length ? (
      <>
        <CustomTable headers={Object.keys(airplanes[0])} items={airplanes} onClick={handleClick} />
        <CustomPagination
          currentPage={page.current}
          lastPage={page.total}
          isLarge={page.total >= 10}
          handlePagination={handlePagination}
        />
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
      {showAlert && <CustomAlert props={alert} />}
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
