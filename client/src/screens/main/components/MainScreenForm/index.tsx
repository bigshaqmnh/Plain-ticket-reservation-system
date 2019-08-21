import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { DatePicker } from '@material-ui/pickers';
import * as Yup from 'yup';
import { withFormik, FormikProps, Form } from 'formik';
import { Moment } from 'moment';
import moment = require('moment');

import { mainScreenFormData } from '../../../../constants/formData';
import { locationInputRegexp } from '../../../../constants/validationRegexp';
import Input from '../../../../components/Input';
import AutocompleteList from '../AutocompleteList';

import { fetchFlights } from '../../actions';

import { parseCountry, parseCity } from '../../../../helpers/parseLocation';

import './style.scss';
import value = require('*.jpg');
import { Simulate } from 'react-dom/test-utils';
import error = Simulate.error;

interface IFormValues {
  from: string;
  to: string;
  flyOut: Moment;
  flyBack: Moment;
  amountOfPassengers: number;
  twoWays: boolean;
}

const counter = (() => {
  let value = 0;

  const plus = () => ++value;
  const count = () => value;

  return { plus, count };
})();

const InnerForm = (props: FormikProps<IFormValues>) => {
  const { values, setValues, touched, errors, handleChange, handleBlur, isSubmitting, isValid } = props;
  console.log('RECIEVES: ', errors);
  const handleDateChange = (field: string) => (date: Moment) => setValues({ ...values, [field]: date });
  const handleSwitchChange = ({ currentTarget }: React.ChangeEvent<HTMLInputElement>) =>
    setValues({ ...values, twoWays: currentTarget.checked });
  const handleAutocompleteChange = (field: string) => (value: string) =>
    setValues({ ...values, [field]: value });

  const fields: string[] = Object.keys(values);
  console.log('values: ', values);

  return (
    <Form>
      <Grid container spacing={8} className="main-form">
        {fields.map((field: string) => {
          if (field === 'twoWays') {
            return;
          }
          let component: JSX.Element = null;
          const value = values[field];

          if ((field === 'flyOut') || (field === 'flyBack')) {
            component =
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
                  onFocus={handleBlur}
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

          return (
            <Grid key={field} item className="main-form-item">
              {component}
            </Grid>
          );
        })}

        <FormControlLabel
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
      </Grid>
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

  validate: ((values: IFormValues) => {

    const { from, to, amountOfPassengers } = values;
    const errors = {};

    const validateLocationField = (field: string, value: string) => {
      console.log('FIELD: ', field, 'VALUE: ', value);
      console.log('CHECK: ', !locationInputRegexp.test(value));
      if (!value) {
        errors[field] = `${field} field is required.`;
      } else if (!locationInputRegexp.test(value)) {

        errors[field] = `Input should be in form 'Country, city'`;
      }
    };


    validateLocationField('from', from);
    // validateLocationField('to', to);


    return errors;
  }),

  validationSchema: Yup.object().shape({
    from: Yup.string()
      .matches(locationInputRegexp, `Input should be in form 'Country, city'`)
      .required('Departure airport is required'),
    to: Yup.string()
      .matches(locationInputRegexp, `Input should be in form 'Country, city'`)
      .required('Destination airport is required'),
    amountOfPassengers: Yup.number()
      .typeError('Only positive numbers are possible')
      .min(1, 'Must be a positive number')
      .required('Amount of Passengers is required')
  }),

  handleSubmit: (values: IFormValues, { props }) => {
    const { dispatch } = props;
    const { from, to, flyOut, flyBack, amountOfPassengers } = values;

    const flyOutParams = {
      depCountry: parseCountry(from),
      depCity: parseCity(from),
      arrCountry: parseCountry(to),
      arrCity: parseCity(to),
      departureTime: flyOut,
      amountOfPassengers
    };

    dispatch(fetchFlights(flyOutParams));

    const flyBackParams = {
      depCountry: parseCountry(to),
      depCity: parseCity(to),
      arrCountry: parseCountry(from),
      arrCity: parseCity(from),
      departureTime: flyBack,
      amountOfPassengers
    };

    dispatch(fetchFlights(flyBackParams));
  }
})(InnerForm);

export default MainScreenFormComponent;
