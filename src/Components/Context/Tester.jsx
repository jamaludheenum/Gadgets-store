import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const schemas = [
  Yup.object({
    email: Yup.string().required('Email is required'),
  }),
  Yup.object({
    password: Yup.string()
      .min(6, 'Minimum 6 characters')
      .required('Password is required'),
  }),
];

const Tester = () => {
  const [step, setStep] = useState(0);

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={schemas[step]}
      onSubmit={(values) => {
        if (step < 1) {
          setStep(step + 1);
        } else {
          alert(JSON.stringify(values));
        }
      }}
    >
      {({ errors, touched }) => (
        <Form>
          {step === 0 && (
            <>
              <Field name="email" placeholder="Email" />
              {touched.email && errors.email && <p>{errors.email}</p>}
            </>
          )}

          {step === 1 && (
            <>
              <Field
                name="password"
                type="password"
                placeholder="Password"
              />
              {touched.password && errors.password && <p>{errors.password}</p>}
            </>
          )}

          <button type="submit">
            {step === 1 ? 'Submit' : 'Next'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Tester;
