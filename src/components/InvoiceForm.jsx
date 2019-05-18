import React, { useState } from 'react';
import {
  Button,
  Container,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
import { addInvoice } from './../actions/invoiceActions';

const InvoiceForm = (props) => {
  const [inputs, setInputs] = useState({
    text: '',
    amount: 0,
    date: new Date()
  });

  const dispatch = useDispatch();

  const handleInputChange = event => {
    event.persist();

    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));
  };

  // Validation should be added
  // Add way to set hour/minutes?
  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
    }
    let { text, amount, date } = inputs;
    const id = uuid();
    amount = parseInt(amount);
    date = new Date(date);
    dispatch(addInvoice({ id, text, amount, date }));
    props.history.push("/invoice")
  };

  return (
    <Container text style={{ marginTop: '10em' }}>
      <Grid
        textAlign="center"
        style={{ height: '100%' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Create a new Invoice
          </Header>
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                iconPosition="left"
                placeholder="Invoice Text"
                name="text"
                value={inputs.text}
                onChange={handleInputChange}
              />
              <Form.Input
                fluid
                type="number"
                iconPosition="left"
                placeholder="Amount"
                name="amount"
                value={inputs.amount}
                onChange={handleInputChange}
              />
              <Form.Input
                fluid
                iconPosition="left"
                placeholder="Confirm Password"
                type="date"
                name="date"
                value={inputs.date}
                onChange={handleInputChange}
              />
              <Button color="teal" fluid size="large">
                Add Invoice
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default InvoiceForm;
