import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

import FlightDetails from './details';
import FlightAdd from './add';
import CustomInput from '../../components/customInput';
import CustomTable from '../../components/customTable';
import CustomPagination from '../../components/customPagination';
import CustomAlert from '../../components/customAlert';
import componentStyles from '../../constants/componentStyles';
import { flightApi } from '../../api';
import CustomButton from '../../components/customButton';

function FlightsContainer() {
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [page, setPage] = useState({ current: 1, next: 1 });

  const [isLoading, setIsLoading] = useState(true);

  const [showInfoScreen, setShowInfoScreen] = useState(false);
  const [showAddScreen, setShowAddScreen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [searchText, setSearchText] = useState('');
  const [alert, setAlert] = useState({});

  const fetchFlights = async params => {
    try {
      const flightsData = await flightApi.getFlights(params);
      const { data, count, nextPage } = flightsData;

      setFlights(data);
      setPage({ current: nextPage - 1, next: nextPage, total: Math.ceil(count / 10) });
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchFlights({ page: page.next });
  }, [searchText]);

  const handleClick = event => {
    const { id } = event.currentTarget;
    const selected = flights.find(flight => flight.id === +id);

    setSelectedFlight(selected);
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
      fetchFlights({ page: selectedPage });
    }
  };

  const handleSave = async data => {
    try {
      setShowAddScreen(false);
      await flightApi.addFlight(data);

      fetchFlights({ page: page.current });
      setAlert({
        variant: componentStyles.success,
        heading: 'Saved',
        mainText: 'Flight was successfully saved.',
        isShown: setShowAlert
      });
    } catch (err) {
      setAlert({
        variant: componentStyles.error,
        heading: 'Not Saved',
        mainText: 'An error occured while saving flight data.',
        isShown: setShowAlert
      });
    } finally {
      setShowAlert(true);
    }
  };

  const handleAdd = () => setShowAddScreen(true);

  const renderTable = () =>
    flights.length ? (
      <>
        <CustomTable headers={Object.keys(flights[0])} items={flights} onClick={handleClick} />
        {page.total > 1 && (
          <CustomPagination
            currentPage={page.current}
            lastPage={page.total}
            isLarge={page.total >= 10}
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
        name="flight-search"
        value={searchText}
        placeholder="Search flights"
        onChange={handleSearch}
      />
      <CustomButton variant={componentStyles.success} text="Add flight" onClick={handleAdd} />
      {isLoading ? <Spinner animation="border" variant={componentStyles.default} /> : renderTable()}
      {showAlert && <CustomAlert props={alert} />}
    </>
  );

  const renderScreen = () =>
    showInfoScreen ? (
      <FlightDetails
        name={selectedFlight.name}
        type={selectedFlight.type}
        maxLuggageCarryWeight={selectedFlight.maxLuggageCarryWeight}
        handleBack={handleBack}
      />
    ) : (
      <FlightAdd handleSave={handleSave} handleBack={handleBack} />
    );

  return showInfoScreen || showAddScreen ? renderScreen() : renderPage();
}

export default FlightsContainer;
