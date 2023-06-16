import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

interface LoginForm {
 username: string;
 password: string;
}

const LoginSchema = Yup.object().shape({
 username: Yup.string()
  .required('Required'),
 password: Yup.string()
  .min(2, 'Too Short!')
  .max(50, 'Too Long!')
  .required('Required'),
});

// Макетные данные для аутентификации
const mockData = {
 username: 'admin',
 password: 'admin',
};

interface LoginPageProps {
 onLogin: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
 const navigate = useNavigate();

 const authenticate = (values: LoginForm) => {
  if (values.username === mockData.username && values.password === mockData.password) {
   onLogin();
   navigate('/');
  } else {
   alert('Invalid username or password');
  }
 };

 return (
  <div className="login-page">

   <Formik
    initialValues={{
     username: '',
     password: '',
    }}
    validationSchema={LoginSchema}
    onSubmit={(values: LoginForm, { setSubmitting }) => {
     authenticate(values);
     setSubmitting(false);
    }}
   >
    {({ isSubmitting }) => (
     <Form className="login-form">
      <h1>Login</h1>
      <p>password and userName: admin</p>
      <Field type="text"
       name="username"
       className="login-input"
       placeholder="admin" />
      <ErrorMessage name="username"
       component="div"
       className="error-message" />
      <Field type="password"
       name="password"
       className="login-input"
       placeholder="admin" />
      <ErrorMessage name="password"
       component="div"
       className="error-message" />
      <button type="submit" disabled={isSubmitting} className="login-button">
       Login
      </button>
     </Form>
    )}
   </Formik>
  </div>
 );
};
