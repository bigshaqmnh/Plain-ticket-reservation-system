import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { DatePicker } from '@material-ui/pickers';
import { withFormik, FormikProps, Form } from 'formik';
import { Moment } from 'moment';

import { IAirport, IAirportData } from '../../interface';

import { fetchForwardFlights, fetchBackwardFlights } from '../../actions';

import AutocompleteList from '../AutocompleteList';

import Input from '../../../../components/Input';

import { mainScreenFormData } from '../../../../constants/formData';

import { parseCountry, parseCity } from '../../../../helpers/parseLocation';

import './style.scss';
import moment = require('moment');

interface IFormValues {
  from: string;
  to: string;
  flyOut: Moment;
  flyBack: Moment;
  amountOfPassengers: number;
  twoWays: boolean;
}

const InnerForm = (props: FormikProps<IFormValues>) => {
  const { values, setValues, touched, errors, handleChange, handleBlur, isSubmitting, isValid } = props;

  const handleDateChange = (field: string) => (date: Moment) => setValues({ ...values, [field]: date });
  const handleSwitchChange = ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) =>
    setValues({ ...values, twoWays: currentTarget.checked });
  const handleAutocompleteChange = (field: string) => (value: string) =>
    setValues({ ...values, [field]: value });

  const fields: string[] = Object.keys(values);

  return (
    <Form className="main-form">
      <Grid className="form-container">
        {fields.map((field: string) => {
          if (field === 'twoWays') {
            return;
          }
          let component: JSX.Element = null;
          const value = values[field];

          if ((field === 'flyOut') || (field === 'flyBack')) {
            const isDisabled = field === 'flyBack' && !values.twoWays;

            component = !isDisabled &&
              <DatePicker
                name={field}
                className="main-form-date-picker"
                label={mainScreenFormData[field].label}
                variant="inline"
                value={value}
                onChange={handleDateChange(field)}
                format="DD-MM-YYYY"
                autoOk={true}
                minDate={field === 'flyBack' ? values.flyOut : moment()}
                disablePast
                disableToolbar
                disabled={field === 'flyBack' && !values.flyOut}
              />;
          } else {
            const renderAutocomplete = (field === 'from' || field === 'to') && value.length >= 2;

            component =
              <>
                <Input
                  name={field}
                  type="search"
                  className="main-form-input"
                  label={mainScreenFormData[field].label}
                  value={value}
                  placeholder={mainScreenFormData[field].placeholder}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched[field] && !!errors[field]}
                  helperText={touched[field] ? errors[field] : ''}
                />
                {
                  renderAutocomplete
                  &&
                  <AutocompleteList
                    name={field}
                    inputValue={value}
                    handleChange={handleAutocompleteChange(field)}
                  />
                }
              </>;
          }

          return component && (
            <Grid key={field} item className="main-form-item">
              {component}
            </Grid>
          );
        })}
      </Grid>
      <FormControlLabel
        className="main-form-switch"
        control={
          <Switch
            checked={values.twoWays}
            onChange={handleSwitchChange}
            value={values.twoWays}
          />
        }
        label="Two-way"
      />

      <Button
        type="submit"
        className="main-form-btn"
        disabled={isSubmitting || !isValid}
      >
        Find flights
      </Button>
    </Form>
  );
};

interface IFormProps {
  from?: string;
  to?: string;
  flyOut?: Moment;
  flyBack?: Moment;
  amountOfPassengers?: number;
  twoWays?: boolean;
  dispatch?: (action: object) => void;
  changePage: () => void;
  locations: string[];
}

interface IValidationErrors {
  from?: string;
  to?: string;
  amountOfPassengers?: string;
}

const MainScreenFormComponent = withFormik<IFormProps, IFormValues>({
  mapPropsToValues: () => ({
    from: mainScreenFormData.from.initValue,
    to: mainScreenFormData.to.initValue,
    flyOut: mainScreenFormData.flyOut.initValue,
    flyBack: mainScreenFormData.flyBack.initValue,
    amountOfPassengers: mainScreenFormData.amountOfPassengers.initValue,
    twoWays: false
  }),

  validate: (values: IFormValues, props: IFormProps): IValidationErrors => {
    const { locations } = props;
    const { from, to, amountOfPassengers } = values;

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

    const validateAmountOfPassengers = () => {
      let invalidText: string = null;

      if (!amountOfPassengers) {
        invalidText = 'Amount of passengers is required';
      } else if (
        !+amountOfPassengers
        ||
        +amountOfPassengers <= 0
      ) {
        invalidText = 'Must be a positive number';
      }

      validationErrors.amountOfPassengers = invalidText;
    };

    validateLocation('from', from);
    validateLocation('to', to);
    validateAmountOfPassengers();

    const hasErrors = Object.values(validationErrors).some((value) => value);

    return hasErrors && validationErrors;
  },

  handleSubmit: (values: IFormValues, { props }) => {
    const { dispatch, changePage } = props;
    const { from, to, flyOut, flyBack, amountOfPassengers, twoWays } = values;

    const flyOutParams = {
      depCountry: parseCountry(from),
      depCity: parseCity(from),
      arrCountry: parseCountry(to),
      arrCity: parseCity(to),
      departureTime: flyOut.startOf('day').toISOString(),
      amountOfPassengers
    };

    dispatch(fetchForwardFlights(flyOutParams));

    if (twoWays) {
      const flyBackParams = {
        depCountry: parseCountry(to),
        depCity: parseCity(to),
        arrCountry: parseCountry(from),
        arrCity: parseCity(from),
        departureTime: flyBack.startOf('day').toISOString(),
        amountOfPassengers
      };

      dispatch(fetchBackwardFlights(flyBackParams));
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

const mapStateToProps = (state) => ({
  locations: parseLocations(state.airports.data)
});

export default connect(mapStateToProps)(MainScreenFormComponent);
