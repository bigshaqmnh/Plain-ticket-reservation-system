import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CustomInput from '../../../components/customInput';
import CustomButton from '../../../components/customButton';
import CustomAlert from '../../../components/customAlert';

import useAlert from '../../../hooks/useAlert';

import componentStyles from '../../../constants/componentStyles';
import { airportValidationScheme } from '../../../constants/validation/schemes';

import formValidation from '../../../helpers/formValidation';
import formatFromCamelCase from '../../../helpers/formatters/formatString';
import extractFormData from '../../../helpers/extractFormData';

function AirportForm({ airport, canEdit, handleBack, handleSave }) {
  const [formData, setFormData] = useState({
    name: { value: airport.name || '', isValid: true, invalidFeedback: '' },
    country: { value: airport.country || '', isValid: true, invalidFeedback: '' },
    city: { value: airport.city || '', isValid: true, invalidFeedback: '' },
    latitude: { value: airport.latitude || 0 },
    longitude: { value: airport.longitude || 0 }
  });

  const { alert, setAlert, showAlert, setShowAlert } = useAlert();

  const airportSearchInput = React.createRef();

  const handleChange = async event => {
    const { name: propName, value: propValue } = event.target;

    const validatedProp = await formValidation.validateOnChange(airportValidationScheme, propName, propValue);

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

  const handleAirportSearch = async event => {
    handleChange(event);

    const searchResults = new google.maps.places.Autocomplete(airportSearchInput.current, {
      language: 'en',
      fields: ['address_components', 'name', 'geometry']
    });

    searchResults.addListener('place_changed', () => {
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
        latitude: { value: latitude.j.toFixed(6) },
        longitude: { value: longitude.j.toFixed(6) }
      });
    });
  };

  return (
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
      <div className="buttons">
        <CustomButton variant={componentStyles.default} text="Back" onClick={handleBack} />
        {canEdit && <CustomButton variant={componentStyles.success} text="Save" onClick={handleSaveClick} />}
      </div>
      {showAlert && <CustomAlert {...alert} />}
    </div>
  );
}

AirportForm.propTypes = {
  airport: PropTypes.shape({
    name: PropTypes.string,
    country: PropTypes.string,
    city: PropTypes.string,
    latitude: PropTypes.number,
    longitude: PropTypes.number
  }),
  canEdit: PropTypes.bool,
  handleSave: PropTypes.func,
  handleBack: PropTypes.func.isRequired
};

AirportForm.defaultProps = {
  airport: {},
  canEdit: true,
  handleSave: null
};

export default AirportForm;
