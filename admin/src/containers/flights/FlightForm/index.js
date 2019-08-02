import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { LinkContainer } from 'react-router-bootstrap';
import { Spinner } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ListGroup from 'react-bootstrap/ListGroup';

import CustomInput from '../../../components/customInput';
import CustomButton from '../../../components/customButton';

import useFetchData from '../../../hooks/useFetchData';
import useFormData from '../../../hooks/useFormData';

import flightApi from '../../../api/flight';
import airportApi from '../../../api/airport';
import airplaneApi from '../../../api/airplane';

import { flightFormData } from '../../../constants/formDataSchemes';
import componentStyles from '../../../constants/componentStyles';
import { flightValidationScheme } from '../../../constants/validation/schemes';
import handlerOption from '../../../constants/handlerOptions';

import { AlertContext } from '../../../context/alert';

import formatFromCamelCase from '../../../helpers/formatters/formatString';
import formatDate from '../../../helpers/formatters/formatDate';
import compare from '../../../helpers/compare';

import '../style.scss';

function FlightForm(props) {
  const { match } = props;

  const flightId = match.params.id;

  const { setAlert, setShowAlert } = useContext(AlertContext);

  const searchParams = { field: 'name', limit: 5 };

  const { data: airports, searchText: airportSearchText, handleSearch: handleAirportSearch } = useFetchData(
    airportApi.getAll,
    setAlert,
    setShowAlert,
    searchParams
  );

  const { data: airplanes, searchText: airplaneSearchText, handleSearch: handleAirplaneSearch } = useFetchData(
    airplaneApi.getAll,
    setAlert,
    setShowAlert,
    searchParams
  );

  const formatFormData = formData => {
    const { departureTime, arrivalTime, departureAirportId, arrivalAirportId, airplaneId } = formData;

    return {
      ...formData,
      departureTime: { value: new Date(departureTime.value) },
      arrivalTime: { value: new Date(arrivalTime.value) },
      departureAirportId: {
        value: departureAirportId.value.id || 0,
        searchText: departureAirportId.value.name || airportSearchText,
        handleSearch: handleAirportSearch
      },
      arrivalAirportId: {
        value: arrivalAirportId.value.id || 0,
        searchText: arrivalAirportId.value.name || airportSearchText,
        handleSearch: handleAirportSearch
      },
      airplaneId: {
        value: airplaneId.value.id || 0,
        searchText: airplaneId.value.name || airplaneSearchText,
        handleSearch: handleAirplaneSearch
      }
    };
  };

  const { formData, setFormData, isShown, canEdit, handleBack, handleChange, handleSave } = useFormData({
    props,
    formDataScheme: flightFormData,
    formatter: formatFormData,
    validationScheme: flightValidationScheme,
    api: flightApi,
    setAlert,
    setShowAlert
  });

  const [activeSearchInput, setActiveSearchInput] = useState('');

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

    setActiveSearchInput(propName);

    setFormData({
      ...formData,
      [propName]: { ...formData[propName], searchText: propValue }
    });

    formData[propName].handleSearch({ target });
  };

  const handleListItemSelect = ({ target }) => {
    const propName = target.getAttribute('name');
    const propValue = +target.getAttribute('value');

    setActiveSearchInput('');

    setFormData({
      ...formData,
      [propName]: { ...formData[propName], value: propValue, searchText: target.innerText }
    });
  };

  const renderCalendar = key => {
    const dateProps = getDateProps(key);
    const handleDateChange = getDateHandler(key);

    return (
      <div key={key}>
        <CustomInput label={formatFromCamelCase(key)} name={key} value={formatDate(dateProps.selected)} disabled />
        {canEdit && (
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
        )}
      </div>
    );
  };

  const renderSelect = (key, value) => (
    <CustomInput
      key={key}
      label={formatFromCamelCase(key)}
      name={key}
      value={value}
      as="select"
      options={['No', 'Yes']}
      onChange={handleSelectChange}
      disabled={!canEdit}
    />
  );

  const renderList = (key, data) => (
    <ListGroup>
      {data.map(item => (
        <ListGroup.Item className="list-item" key={item.id} name={key} value={item.id} onClick={handleListItemSelect}>
          {item.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );

  return isShown ? (
    <div className="form-container">
      {Object.keys(formData).map(key => {
        const { value, searchText, isValid, invalidFeedback } = formData[key];
        let component = null;

        if (value instanceof Date) {
          component = renderCalendar(key);
        } else if (typeof value === 'boolean') {
          component = renderSelect(key, value ? 'Yes' : 'No');
        } else if (typeof value === 'number') {
          const formattedKey = formatFromCamelCase(key.slice(0, -2));
          const showSearchResults = key === activeSearchInput && searchText && airplanes && airports;
          const data = key === 'airplaneId' ? airplanes : airports;

          component = (
            <div key={key}>
              <CustomInput
                type="search"
                label={formattedKey}
                name={key}
                value={searchText}
                placeholder={`Search ${formattedKey}`}
                onChange={handleSearch}
                disabled={!canEdit}
              />
              {showSearchResults && renderList(key, data)}
            </div>
          );
        } else {
          component = (
            <CustomInput
              key={key}
              label={formatFromCamelCase(key)}
              name={key}
              value={value}
              placeholder={`Input ${formatFromCamelCase(key)}`}
              onChange={handleChange}
              isValid={isValid}
              invalidFeedback={invalidFeedback}
              disabled={!canEdit}
            />
          );
        }

        return component;
      })}

      <div className="buttons">
        <CustomButton variant={componentStyles.default} text="Back" onClick={handleBack} />
        {canEdit ? (
          <CustomButton
            variant={componentStyles.success}
            text="Save"
            onClick={() => (flightId ? handleSave(handlerOption.UPDATE_ITEM, { itemId: flightId }) : handleSave())}
          />
        ) : (
          <LinkContainer to={`/flights/${flightId}/edit`}>
            <CustomButton variant={componentStyles.warning} text="Edit" />
          </LinkContainer>
        )}
      </div>
    </div>
  ) : (
    <Spinner animation="border" />
  );
}

FlightForm.propTypes = {
  match: PropTypes.shape({}).isRequired
};

export default FlightForm;
