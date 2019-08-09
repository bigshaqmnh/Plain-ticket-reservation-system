import React from 'react';
import * as Yup from 'yup';
import { withFormik, FormikProps, FormikErrors, Form, Field } from 'formik';
import moment = require('moment');

import { mainScreenFormData } from '../../../../constants/formData';
import Input from '../../../../components/Input';

interface FormValues {
  from: string;
  to: string;
  flyOut: Date;
  flyBack: Date;
  ammountOfPassengers: number;
}

interface IFormValues<FormValues> {
  [key: string]: FormValues;
}

interface IOtherProps {
  handleDateChange: (date: Date) => void;
}

function InnerForm(props: IOtherProps & FormikProps<IFormValues<string>>) {
  const { values, touched, errors, isSubmitting, isValid, handleChange, handleDateChange } = props;
  console.log('touch: ', touched);

  const fields: string[] = Object.keys(values);

  return (
    <Form>
      {fields.map((field) =>
        <Field
          key={field}

          render={() =>
            <Input
              name={field}
              label={mainScreenFormData[field].label}
              value={values[field]}
              placeholder={mainScreenFormData[field].placeholder}
              onChange={handleChange}
              error={!!errors[field]}
              helperText={errors[field] || ''}
            />}
        />)}

      <button type="submit" disabled={isSubmitting || !isValid}>
        Search
      </button>
    </Form>
  );
}

interface IFormProps {
  from: string;
  to: string;
  flyOut: Date;
  flyBack: Date;
  ammountOfPassengers: number;
  handleDateChange: (date: Date) => void;
}

const MainScreenForm = withFormik<IFormProps, IFormValues<string>>({
  // mapPropsToValues: (props) => ({
  //   from: props.from,
  //   to: props.to,
  //   flyOut: props.flyOut,
  //   flyBack: props.flyBack,
  //   ammountOfPassengers: props.ammountOfPassengers
  // }),

  validationSchema: Yup.object().shape({
    from: Yup.string().required('Departure airport is required'),
    to: Yup.string().required('Destination airport is required'),
    ammountOfPassengers: Yup.number().required('Ammount of Passengers is required')
  }),

  handleSubmit: (values: IFormValues<string>) => {
    console.log('form values: ', values);
  }
})(InnerForm);

export default MainScreenForm;
