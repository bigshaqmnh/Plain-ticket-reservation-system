import React from 'react';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';

import CustomButton from '../../components/customButton';
import buttonVariants from '../../constants/button/buttonVariants';
import authSchema from '../../constants/auth/authSchema';

class AuthContainer extends React.PureComponent {
  handleSubmit = formData => {
    console.log('form data', formData);
  };

  render() {
    return (
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        onSubmit={this.onLogInFormSubmit}
        validationSchema={authSchema}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group md="4" controlId="validationFormik01">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
                isValid={touched.email && !errors.email}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group md="4" controlId="validationFormik02">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isValid={touched.password && !errors.password}
              />

              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <CustomButton
              variant={buttonVariants.default}
              type="submit"
              text="Log in"
              onClick={this.onLogInFormSubmit}
            />
          </Form>
        )}
      </Formik>
    );
  }
}

export default AuthContainer;
