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
import { login } from "../actions/userActions";
import { validateEmailname } from "../validators/userValidators";
import ErrorMessage from "./ErrorMessage";

const LoginForm = () => {
  const [inputs, setInputs] = useState({
    emailname: "",
    password: ""
  });
  const [error, setError] = useState({
    emailname: {
      isValid: true,
      errors: []
    },
    password: {
      isValid: true,
      errors: []
    }
  });

  const dispatch = useDispatch();

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
    const clientErr = validateEmailname(inputs.emailname);
    if (clientErr.isValid) {
      dispatch(login(inputs.emailname, inputs.password, setError));
    } else {
      setError({
        ...error,
        emailname: clientErr
      });
    }
  };

  const errors = [
    ...error.emailname.errors,
    ...error.password.errors
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
            Login to your account
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address or username"
                name="emailname"
                value={inputs.emailname}
                onChange={handleInputChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
                value={inputs.password}
                onChange={handleInputChange}
              />
              <Button color="teal" fluid size="large">
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            Need to create an account? <Link to="/signup">Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default LoginForm;
