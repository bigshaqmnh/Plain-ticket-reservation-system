import { Form, FormikProps } from 'formik';
import { Moment } from 'moment';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { DatePicker } from '@material-ui/pickers';
import { mainScreenFormData } from '../../../../constants/formData';
import Input from '../../../../components/Input';
import AutocompleteList from '../AutocompleteList';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import moment = require('moment');

import { IFormValues } from './interfaces';

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

export default InnerForm;
