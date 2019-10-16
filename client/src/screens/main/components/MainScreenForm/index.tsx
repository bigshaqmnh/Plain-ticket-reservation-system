import React from 'react';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import { Moment } from 'moment';

import { IAirport, IAirportData, IDispatch, IFlightFetchRequest, IState } from '../../../../interfaces';
import { IFormProps, IFormValues, IValidationErrors } from './interfaces';

import InnerForm from './InnerForm';

import { fetchForwardFlights, fetchBackwardFlights, setNeedBackwardTicket } from '../../actionCreators';

import { mainScreenFormData } from '../../../../constants/formData';

import parseLocation from '../../../../helpers/parseLocation';
import navigateTo from '../../../../helpers/navigateTo';

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
        invalidText = 'Invalid location name';

        for (const location of locations) {
          if (location.toLowerCase() === value.toLowerCase()) {
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
        || +numberOfPassengers <= 0
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
    const { fetchForwardFlights, fetchBackwardFlights, setNeedBackwardTicket } = props;
    const { from, to, flyOut, flyBack, numberOfPassengers, twoWays } = values;
    const { country: fromCountry, city: fromCity } = parseLocation(from);
    const { country: toCountry, city: toCity } = parseLocation(to);

    const flyOutParams: IFlightFetchRequest = {
      depCountry: fromCountry,
      depCity: fromCity,
      arrCountry: toCountry,
      arrCity: toCity,
      departureTime: flyOut.startOf('day').toISOString(),
      numberOfPassengers
    };

    fetchForwardFlights(flyOutParams);

    if (twoWays) {
      const flyBackParams: IFlightFetchRequest = {
        depCountry: toCountry,
        depCity: toCity,
        arrCountry: fromCountry,
        arrCity: fromCity,
        departureTime: flyBack.startOf('day').toISOString(),
        numberOfPassengers
      };

      fetchBackwardFlights(flyBackParams);
      setNeedBackwardTicket(true);
    }

    navigateTo('/feed');
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

const mapStateToProps = ({ main }: IState) => ({
  locations: parseLocations(main.airports.data as IAirportData)
});

const mapDispatchToProps = (dispatch: IDispatch) => ({
  fetchForwardFlights: (params: IFlightFetchRequest) => dispatch(fetchForwardFlights(params)),
  fetchBackwardFlights: (params: IFlightFetchRequest) => dispatch(fetchBackwardFlights(params)),
  setNeedBackwardTicket: (isNeeded: boolean) => dispatch(setNeedBackwardTicket(isNeeded))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreenFormComponent);
