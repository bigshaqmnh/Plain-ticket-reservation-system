import React from 'react';
import PropTypes from 'prop-types';

import CustomInput from '../../../components/customInput';
import CustomButton from '../../../components/customButton';
import componentStyles from '../../../constants/componentStyles';
import formatString from '../../../helpers/formatters/formatString';
import formatDate from '../../../helpers/formatters/formatDate';

function FlightEdit({ flight, handleBack, handleSave }) {
  return (
    <>
      {Object.keys(flight).map(key => {
        if (key === 'id') {
          return;
        }

        const label = formatString(key);
        const value = flight[key] instanceof Date ? formatDate(flight[key]) : flight[key];

        return <CustomInput key={key} label={label} name={key} value={value} />;
      })}
      <CustomButton variant={componentStyles.default} text="Back" onClick={handleBack} />
      <CustomButton variant={componentStyles.success} text="Save" onClick={handleSave} />
    </>
  );
}

FlightEdit.propTypes = {
  flight: PropTypes.shape({
    id: PropTypes.number,
    departureTime: PropTypes.instanceOf(Date),
    arrivalTime: PropTypes.instanceOf(Date),
    luggageOverweightCost: PropTypes.string,
    isCancelled: PropTypes.string,
    departureAirport: PropTypes.string,
    arrivalAirport: PropTypes.string
  }).isRequired,
  handleBack: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired
};

export default FlightEdit;
