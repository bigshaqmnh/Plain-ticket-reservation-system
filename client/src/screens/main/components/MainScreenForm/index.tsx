import React from 'react';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import { Moment } from 'moment';

import { IAction, IAirport, IAirportData, IDispatch, IFlightFetchRequest, IState } from '../../../../interfaces';
import { IFormProps, IFormValues, IValidationErrors } from './interfaces';

import InnerForm from './InnerForm';

import { fetchForwardFlights, fetchBackwardFlights } from '../../actionCreators';

import { mainScreenFormData } from '../../../../constants/formData';

import parseLocation from '../../../../helpers/parseLocation';

import './style.scss';

const MainScreenFormComponent = withFormik<IFormProps, IFormValues>({
  mapPropsToValues: () => ({
    from: mainScreenFormData.from.initValue as string,
    to: mainScreenFormData.to.initValue as string,
    flyOut: mainScreenFormData.flyOut.initValue as Moment,
    flyBack: mainScreenFormData.flyBack.initValue as Moment,
    numberOfPassengers: mainScreenFormData.numberOfPassengers.initValue as number,
    twoWays: false
  }),

  validate: (values: IFormValues, props: IFormProps): IValidationErrors => {
    const { locations } = props;
    const { from, to, numberOfPassengers } = values;

    const validationErrors: IValidationErrors = {};

    const validateLocation = (field: string, value: string) => {
      let invalidText: string = null;

      if (!value) {
        invalidText = 'Location is required';
      } else {
        const validationRegExp: RegExp = new RegExp(`^${value}$`, 'i');
        invalidText = 'Invalid location name';

        for (const location of locations) {
          if (validationRegExp.test(location)) {
            invalidText = null;
            break;
          }
        }
      }

      validationErrors[field] = invalidText;
    };

    const validateNumberOfPassengers = () => {
      let invalidText: string = null;

      if (!numberOfPassengers) {
        invalidText = 'Number of passengers is required';
      } else if (
        !+numberOfPassengers
        ||
        +numberOfPassengers <= 0
      ) {
        invalidText = 'Must be a positive number';
      }

      validationErrors.numberOfPassengers = invalidText;
    };

    validateLocation('from', from);
    validateLocation('to', to);
    validateNumberOfPassengers();

    const hasErrors = Object.values(validationErrors).some((value) => value);

    return hasErrors && validationErrors;
  },

  handleSubmit: (values: IFormValues, { props }) => {
    const { fetchForwardFlights, fetchBackwardFlights, changePage } = props;
    const { from, to, flyOut, flyBack, numberOfPassengers, twoWays } = values;
    const {country: depCountry, city: depCity} = parseLocation(from);
    const {country: arrCountry, city: arrCity} = parseLocation(to);

    const flyOutParams: IFlightFetchRequest = {
      depCountry,
      depCity,
      arrCountry,
      arrCity,
      departureTime: flyOut.startOf('day').toISOString(),
      numberOfPassengers
    };

    fetchForwardFlights(flyOutParams);

    if (twoWays) {
      const flyBackParams: IFlightFetchRequest = {
        depCountry,
        depCity,
        arrCountry,
        arrCity,
        departureTime: flyBack.startOf('day').toISOString(),
        numberOfPassengers
      };

      fetchBackwardFlights(flyBackParams);
    }

    changePage();
  }
})(InnerForm);

const parseLocations = (airports: IAirportData) => {
  const parsed = [];

  for (const country in airports) {
    if (airports.hasOwnProperty(country)) {
      airports[country].forEach((airport: IAirport) =>
        parsed.push(`${country}, ${airport.city}`)
      );
    }
  }

  return parsed;
};

const mapStateToProps = (state: IState) => ({
  locations: parseLocations(state.airports.data as IAirportData)
});

const mapDispatchToProps = (dispatch: IDispatch) => ({
  fetchForwardFlights: (params) => dispatch(fetchForwardFlights(params)),
  fetchBackwardFlights: (params) => dispatch(fetchBackwardFlights(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreenFormComponent);
