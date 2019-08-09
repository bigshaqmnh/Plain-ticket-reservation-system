import * as React from "react";
import { withFormik, FormikProps } from "formik";
import * as Yup from "yup";
import { DatePicker } from '@material-ui/pickers';

import { Container, TextField, Button } from '@material-ui/core';
import { Moment } from "moment";
import moment = require("moment");

interface IFormValues {
  email: string;
  password: string;
  date: Moment;
}

interface IOtherProps {
  title?: string;
}

interface IMyFormProps {
  initialEmail?: string;
  initialPassword?: string;
  initialDate?: Moment;
  handleDateChange?: (date: Moment) => void;
}

const InnerForm = (props: IOtherProps & FormikProps<IFormValues>) => {
  const {
    values,
    errors,
    isValid,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    title
  } = props;

  return (
    <Container>
      <h1>{title}</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          type="email"
          label="Email"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          error={touched.email && !!errors.email}
          helperText={touched.email ? errors.email : ''}
        />

        <TextField
          type="password"
          label="Password"
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          error={touched.password && !!errors.password}
          helperText={touched.password ? errors.password : ''}
        />

        <DatePicker
          disableToolbar
          variant="inline"
          label="Date"
          helperText={touched.date ? errors.date : ''}
          value={values.date}
          onChange={(date: Moment) => {
            console.log('prev date: ', values.date);
            console.log('chosen date: ', date);
            values.date = date;
          }}
        />

        <Button
          type="submit"
          disabled={
            !isValid || isSubmitting
          }
        >
          Sign In
                </Button>
      </form>
    </Container>
  );
};

const Form = withFormik<IMyFormProps, IFormValues>({
  mapPropsToValues: (props) => ({
    email: props.initialEmail || "",
    password: props.initialPassword || "",
    date: props.initialDate || moment()
  }),

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email not valid")
      .required("Email is required"),
    password: Yup.string().min(6, 'Your password is too short').required("Password is required"),
    date: Yup.date().min(new Date()).required('Date is required!')
  }),

  handleSubmit(
    { email, password, date }: IFormValues,
    { props, setSubmitting, setErrors }
  ) {
    // console.log('other props: ', props, setSubmitting, setErrors);
    console.log('form values: ', email, password, date);
  }
})(InnerForm);

export default Form;
