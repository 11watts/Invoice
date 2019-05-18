import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { signup } from "../actions/userActions";
import {
  validateSignUp,
  validateUsername,
  validateEmail,
  validatePassword,
  validatePassword2
} from "../validators/userValidators";
import ErrorMessage from "./ErrorMessage";

const SignUpForm = () => {
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
    password2: ""
  });

  const [error, setError] = useState({
    email: {
      isValid: true,
      errors: []
    },
    username: {
      isValid: true,
      errors: []
    },
    password: {
      isValid: true,
      errors: []
    },
    password2: {
      isValid: true,
      errors: []
    }
  });

  const dispatch = useDispatch();

  const isValid = e =>
    e.email.isValid &&
    e.username.isValid &&
    e.password.isValid &&
    e.password2.isValid;

  const handleInputChange = event => {
    event.persist();
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
    }
    const clientErr = validateSignUp(inputs);
    if (isValid(clientErr)) {
      dispatch(signup(inputs.username, inputs.email, inputs.password, setError));
    } else {
      setError({
        ...error,
        ...clientErr
      });
    }
  };

  const errors = [
    ...error.email.errors,
    ...error.username.errors,
    ...error.password.errors,
    ...error.password2.errors
  ];

  return (
    <Container text style={{ marginTop: "7em" }}>
      <Grid
        textAlign="center"
        style={{ height: "100%" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <ErrorMessage errors={errors} header="Error Creating Account" />
          <Header as="h2" color="teal" textAlign="center">
            Create an account
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                error={!error.username.isValid}
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                name="username"
                value={inputs.username}
                onChange={handleInputChange}
                onBlur={() => {
                  const username = validateUsername(inputs.username);
                  setError({ ...error, username });
                }}
              />
              <Form.Input
                error={!error.email.isValid}
                fluid
                icon="envelope"
                iconPosition="left"
                placeholder="E-mail address"
                name="email"
                value={inputs.email}
                onChange={handleInputChange}
                onBlur={() => {
                  const email = validateEmail(inputs.email);
                  setError({ ...error, email });
                }}
              />
              <Form.Input
                error={!error.password.isValid}
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
                value={inputs.password}
                onChange={handleInputChange}
                onBlur={() => {
                  const password = validatePassword(inputs.password);
                  setError({ ...error, password });
                }}
              />
              <Form.Input
                error={!error.password2.isValid}
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Confirm Password"
                type="password"
                name="password2"
                value={inputs.password2}
                onChange={handleInputChange}
                onBlur={() => {
                  const password2 = validatePassword2(
                    inputs.password,
                    inputs.password2
                  );
                  setError({ ...error, password2 });
                }}
              />
              <Button color="teal" fluid size="large">
                Create account
              </Button>
            </Segment>
          </Form>
          <Message>
            Alread have an account? <Link to="/login">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default SignUpForm;
