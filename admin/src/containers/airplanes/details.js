import React from 'react';
import PropTypes from 'prop-types';

import CustomInput from '../../components/customInput';
import CustomButton from '../../components/customButton';
import componentStyles from '../../constants/componentStyles';
import stringFormatter from '../../helpers/stringFormatter';

function AirplaneDetails({ name, type, maxLuggageCarryWeight, handleBack }) {
  const formData = {
    name,
    type,
    maxLuggageCarryWeight
  };

  return (
    <>
      {Object.keys(formData).map(key => (
        <CustomInput key={key} label={stringFormatter.toRegular(key)} name={key} value={formData[key]} disabled />
      ))}
      <CustomButton variant={componentStyles.default} text="Back" onClick={handleBack} />
    </>
  );
}

AirplaneDetails.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  maxLuggageCarryWeight: PropTypes.number.isRequired,
  handleBack: PropTypes.func.isRequired
};

export default AirplaneDetails;
