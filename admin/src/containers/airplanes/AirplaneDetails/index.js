import React from 'react';
import PropTypes from 'prop-types';

import CustomInput from '../../../components/customInput';
import CustomButton from '../../../components/customButton';
import componentStyles from '../../../constants/componentStyles';
import formatString from '../../../helpers/formatters/formatString';

function AirplaneDetails({ airplane, handleBack }) {
  return (
    <>
      {Object.keys(airplane).map(key => (
        <CustomInput key={key} label={formatString(key)} name={key} value={airplane[key]} disabled />
      ))}
      <CustomButton variant={componentStyles.default} text="Back" onClick={handleBack} />
    </>
  );
}

AirplaneDetails.propTypes = {
  airplane: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    maxLuggageCarryWeight: PropTypes.number
  }).isRequired,
  handleBack: PropTypes.func.isRequired
};

export default AirplaneDetails;
