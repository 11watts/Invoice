import React, { useState } from 'react';
import {
  Button,
  Container,
  Form,
  Grid,
  Header,
  Segment
} from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import {  editInvoice } from './../actions/invoiceActions';

var timeOptions = {
  year: 'numeric',
  month: '2-digit',
  day: 'numeric'
};

const EditInvoiceForm = props => {
  let { id, text, amount, date } = props.location.state;
  const [inputs, setInputs] = useState({
    text: text,
    amount: amount,
    date: date.toLocaleDateString('en', timeOptions)
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
    amount = parseInt(amount);
    date = new Date(date);
    dispatch(editInvoice({ id, text, amount, date }));
    props.history.push('/invoice');
  };

  return (
    <Container text style={{ marginTop: '18em' }}>
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

export default EditInvoiceForm;
