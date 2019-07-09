import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ListGroup from 'react-bootstrap/ListGroup';

import CustomInput from '../../../components/customInput';
import CustomButton from '../../../components/customButton';
import CustomAlert from '../../../components/customAlert';

import useFetchData from '../../../hooks/useFetchData';
import useAlert from '../../../hooks/useAlert';

import airportApi from '../../../api/airport';
import airplaneApi from '../../../api/airplane';

import componentStyles from '../../../constants/componentStyles';
import { flightValidationScheme } from '../../../constants/validation/schemes';

import formValidation from '../../../helpers/formValidation';
import formatString from '../../../helpers/formatters/formatString';
import formatDate from '../../../helpers/formatters/formatDate';
import compare from '../../../helpers/compare';
import extractFormData from '../../../helpers/extractFormData';

import './style.scss';

function FlightAdd(props) {
  const { handleSave, handleBack } = props;

  const searchParams = { field: 'name', limit: 5 };

  const {
    items: airports,
    isLoading: areAirportsLoading,
    searchText: airportSearchText,
    setSearchText: setAirportSearchText
  } = useFetchData(airportApi.getAirports, searchParams);

  const {
    items: airplanes,
    isLoading: areAirplanesLoading,
    searchText: airplaneSearchText,
    setSearchText: setAirplaneSearchText
  } = useFetchData(airplaneApi.getAirplanes, searchParams);

  const [formData, setFormData] = useState({
    departureTime: { value: new Date() },
    arrivalTime: { value: new Date() },
    luggageOverweightCost: { value: '', isValid: true, invalidFeedback: '' },
    isCancelled: { value: false },
    departureAirportId: {
      value: 0,
      searchText: airportSearchText,
      setSearchText: setAirportSearchText
    },
    arrivalAirportId: {
      value: 0,
      searchText: airportSearchText,
      setSearchText: setAirportSearchText
    },
    airplaneId: {
      value: 0,
      searchText: airplaneSearchText,
      setSearchText: setAirplaneSearchText
    }
  });

  const [activeInput, setActiveInput] = useState('');

  const { alert, setAlert, showAlert, setShowAlert } = useAlert();

  const handleChange = async event => {
    const { name: propName, value: propValue } = event.target;

    const validatedProp = await formValidation.validateOnChange(flightValidationScheme, propName, propValue);

    setFormData({
      ...formData,
      ...validatedProp
    });
  };

  const handleSaveClick = () => {
    const validatedForm = formValidation.validateOnSubmit(formData);

    if (!validatedForm.isValid) {
      setAlert({ ...validatedForm.alertData, isShown: setShowAlert });
      setShowAlert(true);
    } else {
      const data = extractFormData(formData);
      handleSave(data);
    }
  };

  const getDateHandler = key => date => {
    setFormData({
      ...formData,
      [key]: { value: date }
    });
  };

  const getDateProps = key => {
    const currentDate = new Date();
    const { departureTime, arrivalTime } = formData;
    const dateProps = {};

    if (key === 'departureTime') {
      dateProps.selected = departureTime.value > currentDate ? departureTime.value : currentDate;
      dateProps.minDate = currentDate;
      if (compare.dates(dateProps.selected, currentDate)) {
        dateProps.minTime = currentDate;
        dateProps.maxTime = new Date(currentDate).setHours(23, 45);
      }
    } else {
      dateProps.selected = departureTime.value > arrivalTime.value ? departureTime.value : arrivalTime.value;
      dateProps.minDate = departureTime.value;
      dateProps.openToDate = departureTime.value;
      if (compare.dates(dateProps.selected, departureTime.value)) {
        dateProps.minTime = departureTime.value;
        dateProps.maxTime = new Date(departureTime.value).setHours(23, 45);
      }
    }

    return dateProps;
  };

  const handleSelectChange = event => {
    const value = event.target.value === 'Yes';

    setFormData({
      ...formData,
      isCancelled: { value }
    });
  };

  const handleSearch = ({ target }) => {
    const { name: propName, value: propValue } = target;

    setActiveInput(propName);

    setFormData({
      ...formData,
      [propName]: { ...formData[propName], searchText: propValue }
    });

    formData[propName].setSearchText(propValue);
  };

  const handleListItemSelect = ({ target }) => {
    const propName = target.getAttribute('name');
    const propValue = +target.getAttribute('value');

    setActiveInput('');

    setFormData({
      ...formData,
      [propName]: { ...formData[propName], value: propValue, searchText: target.innerText }
    });
  };

  return (
    <>
      {Object.keys(formData).map(key => {
        const { value, searchText, isValid, invalidFeedback } = formData[key];
        let component = null;

        if (value instanceof Date) {
          const dateProps = getDateProps(key);
          const handleDateChange = getDateHandler(key);

          component = (
            <div key={key}>
              <CustomInput label={formatString(key)} name={key} value={formatDate(dateProps.selected)} disabled />
              <DatePicker
                inline
                {...dateProps}
                onChange={handleDateChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy HH:mm"
                showDisabledMonthNavigation
              />
            </div>
          );
        } else if (typeof value === 'boolean') {
          component = (
            <CustomInput
              key={key}
              label={formatString(key)}
              name={key}
              value={value ? 'Yes' : 'No'}
              as="select"
              options={['No', 'Yes']}
              onChange={handleSelectChange}
            />
          );
        } else if (typeof value === 'number') {
          component = (
            <div key={key}>
              <CustomInput
                type="search"
                label={formatString(key.slice(0, -2))}
                name={key}
                value={searchText}
                placeholder={`Search ${formatString(key.slice(0, -2))}`}
                onChange={handleSearch}
              />
              {key === activeInput && searchText && (
                <ListGroup>
                  {key === 'airplaneId'
                    ? airplanes &&
                      !areAirplanesLoading &&
                      airplanes.map(airplane => (
                        <ListGroup.Item
                          className="list-item"
                          key={airplane.id}
                          name={key}
                          value={airplane.id}
                          onClick={handleListItemSelect}
                        >
                          {airplane.name}
                        </ListGroup.Item>
                      ))
                    : airports &&
                      !areAirportsLoading &&
                      airports.map(airport => (
                        <ListGroup.Item
                          className="list-item"
                          key={airport.id}
                          name={key}
                          value={airport.id}
                          onClick={handleListItemSelect}
                        >
                          {airport.name}
                        </ListGroup.Item>
                      ))}
                </ListGroup>
              )}
            </div>
          );
        } else {
          component = (
            <CustomInput
              key={key}
              label={formatString(key)}
              name={key}
              value={value}
              placeholder={`Input ${formatString(key)}`}
              onChange={handleChange}
              isValid={isValid}
              invalidFeedback={invalidFeedback}
            />
          );
        }

        return component;
      })}
      <CustomButton variant={componentStyles.default} text="Back" onClick={handleBack} />
      <CustomButton variant={componentStyles.success} text="Save" onClick={handleSaveClick} />
      {showAlert && <CustomAlert {...alert} />}
    </>
  );
}

FlightAdd.propTypes = {
  handleSave: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired
};

export default FlightAdd;
