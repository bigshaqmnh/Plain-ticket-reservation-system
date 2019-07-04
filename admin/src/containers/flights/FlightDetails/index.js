import React from 'react';
import PropTypes from 'prop-types';

import CustomInput from '../../../components/customInput';
import CustomButton from '../../../components/customButton';
import componentStyles from '../../../constants/componentStyles';
import stringFormatter from '../../../helpers/stringFormatter';

function FlightDetails({ flight, handleBack, handleEdit }) {
  return (
    <>
      {Object.keys(flight).map(key => {
        const label = stringFormatter.toRegular(key);
        const value = flight[key] instanceof Date ? flight[key].toDateString() : flight[key];

        return <CustomInput key={key} label={label} name={key} value={value} disabled />;
      })}
      <CustomButton variant={componentStyles.default} text="Back" onClick={handleBack} />
      <CustomButton variant={componentStyles.warning} text="Edit" onClick={handleEdit} />
    </>
  );
}

FlightDetails.propTypes = {
  flight: PropTypes.shape({
    id: PropTypes.number,
    departureTime: PropTypes.instanceOf(Date),
    arrivalTime: PropTypes.instanceOf(Date),
    luggageOverweightCost: PropTypes.number,
    isCancelled: PropTypes.string,
    departureAirport: PropTypes.string,
    arrivalAirport: PropTypes.string
  }).isRequired,
  handleBack: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired
};

export default FlightDetails;
