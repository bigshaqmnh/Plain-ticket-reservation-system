import React, { useContext, useState, useEffect, useRef } from 'react';
import { Spinner } from 'react-bootstrap';

import CustomInput from '../../../components/customInput';
import CustomButton from '../../../components/customButton';

import useFormData from '../../../hooks/useFormData';

import airportApi from '../../../api/airport';

import { airportFormData } from '../../../constants/formDataSchemes';
import componentStyles from '../../../constants/componentStyles';
import { airportValidationScheme } from '../../../constants/validation/schemes';

import { AlertContext } from '../../../context/alert';

import formatFromCamelCase from '../../../helpers/formatters/formatString';

import '../style.scss';

function AirportForm(props) {
  // const [formData, setFormData] = useState({
  //   name: { value: airport.name || '' },
  //   country: { value: airport.country || '', isValid: true, invalidFeedback: '' },
  //   city: { value: airport.city || '', isValid: true, invalidFeedback: '' },
  //   latitude: { value: airport.latitude || 0 },
  //   longitude: { value: airport.longitude || 0 }
  // });

  // const formatFormData = formData => {
  //   const { name, latitude, longitude } = formData;

  //   return {
  //     ...formData,
  //     name: name || '',
  //     latitude: latitude || 0,
  //     longitude: longitude || 0
  //   };
  // };
  const { setAlert, setShowAlert } = useContext(AlertContext);

  const { formData, setFormData, isShown, canEdit, handleBack, handleChange, handleSave } = useFormData({
    props,
    formDataScheme: airportFormData,
    validationScheme: airportValidationScheme,
    api: airportApi,
    setAlert,
    setShowAlert
  });
  console.log('form data: ', formData);
  const [showMap, setShowMap] = useState(false);
  console.log('map: ', showMap);
  const airportSearchInput = useRef(null);

  const mapContainer = useRef(null);

  const setMapData = () => {
    const airportPosition = { lat: +formData.latitude.value, lng: +formData.longitude.value };

    const map = new google.maps.Map(mapContainer.current, {
      center: airportPosition,
      zoom: 13,
      disableDefaultUI: true
    });

    const marker = new google.maps.Marker({
      position: airportPosition
    });

    marker.setMap(map);
  };

  useEffect(() => {
    if (isShown) {
      setShowMap(!!(formData.latitude.value && formData.longitude.value));
    }
    if (showMap) {
      setMapData();
    }
  }, [showMap, isShown]);

  const handleAirportChoose = searchResults => {
    const selectedAirport = searchResults.getPlace();
    const { address_components: addressParts, name } = selectedAirport;
    const { na: latitude, ga: longitude } = selectedAirport.geometry.viewport;
    let city = '';
    let country = '';

    addressParts.forEach(addressPart =>
      addressPart.types.forEach(type => {
        if (type === 'locality') {
          city = addressPart.long_name;
        }
        if (type === 'country') {
          country = addressPart.long_name;
        }
      })
    );

    setFormData({
      name: { ...formData.name, value: name },
      country: { ...formData.country, value: country },
      city: { ...formData.city, value: city },
      latitude: { value: latitude.l.toFixed(6) },
      longitude: { value: longitude.l.toFixed(6) }
    });

    setShowMap(true);
  };

  const handleAirportSearch = async ({ target }) => {
    setFormData({
      ...formData,
      name: { value: target.value }
    });
    setShowMap(false);

    const searchResults = new google.maps.places.Autocomplete(airportSearchInput.current, {
      language: 'en',
      fields: ['address_components', 'name', 'geometry']
    });

    searchResults.addListener('place_changed', () => handleAirportChoose(searchResults));
  };

  return isShown ? (
    <div className="form-container">
      {Object.keys(formData).map(key => {
        const { value, isValid, invalidFeedback } = formData[key];
        const isDisabled = key === 'latitude' || key === 'longitude' || !canEdit;
        const inputProps =
          key === 'name'
            ? {
                refElement: airportSearchInput,
                type: 'search',
                onChange: handleAirportSearch
              }
            : {
                onChange: handleChange
              };

        return (
          <CustomInput
            {...inputProps}
            key={key}
            label={formatFromCamelCase(key)}
            name={key}
            value={value}
            placeholder={`Input ${formatFromCamelCase(key)}`}
            isValid={isValid}
            invalidFeedback={invalidFeedback}
            disabled={isDisabled}
          />
        );
      })}
      {showMap && <div id="map" className="map" ref={mapContainer} />}

      <div className="buttons">
        <CustomButton variant={componentStyles.default} text="Back" onClick={handleBack} />
        {canEdit && <CustomButton variant={componentStyles.success} text="Save" onClick={handleSave} />}
      </div>
    </div>
  ) : (
    <Spinner animation="border" />
  );
}

export default AirportForm;
