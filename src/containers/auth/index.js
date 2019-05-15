import React from 'react';
import { Formik, Form, Field } from 'formik';

import CustomButton from '../../components/customButton';
import buttonVariants from '../../constants/button/buttonVariants';
import authSchema from '../../constants/auth/authSchema';

class AuthContainer extends React.PureComponent {
  onLogInFormSubmit = formData => {
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
        {({ errors, touched }) => (
          <Form>
            <Field name="email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <Field name="password" />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
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
