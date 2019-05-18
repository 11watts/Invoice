import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Button, Form, Segment, Table, Header } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteInvoice } from '../actions/invoiceActions';

const toDollarFormat = n => `$${(n / 100).toFixed(2)}`;

const InvoiceList = props => {
  const [inputs, setInputs] = useState({
    startDate: new Date('1990-12-31').toISOString().slice(0, 10),
    endDate: new Date().toISOString().slice(0, 10)
  });

  const handleInputChange = event => {
    event.persist();

    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));
  };
  const mapState = useCallback(state => state.invoiceReducer);

  const invoices = useSelector(mapState);
  const dispatch = useDispatch();
  let totalCost = 0;

  return (
    <Container text style={{ marginTop: '7em' }}>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Information</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Edit</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Object.keys(invoices).map(key => {
            const { id, text, amount, date } = invoices[key];
            totalCost += amount;
            const endTime = new Date(inputs.endDate).getTime();
            const startTime = new Date(inputs.startDate).getTime();
            if (date.getTime() > endTime || startTime > date.getTime()) {
              return;
            }
            return (
              <Table.Row key={key}>
                <Table.Cell>{text}</Table.Cell>
                <Table.Cell>{toDollarFormat(amount)}</Table.Cell>
                <Table.Cell>{date.toISOString().slice(0, 10)}</Table.Cell>
                <Table.Cell>
                  <Button
                    fluid
                    size="large"
                    onClick={() => {
                      props.history.push({
                        pathname: '/editinvoice',
                        state: { id, text, amount, date }
                      });
                    }}
                  >
                    Edit
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    fluid
                    size="large"
                    color="red"
                    onClick={() => {
                      dispatch(deleteInvoice(id));
                    }}
                  >
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="5">
              Total Amount: {toDollarFormat(totalCost)}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
      <Form size="large">
        <Segment stacked>
          <Header as='h3'>Filter Invoices</Header>
          <Form.Input
            fluid
            label="Start Date"
            iconPosition="left"
            placeholder="Confirm Password"
            type="date"
            name="startDate"
            onChange={handleInputChange}
            value={inputs.startDate}
          />
          <Form.Input
            fluid
            label="End Date"
            iconPosition="left"
            placeholder="Confirm Password"
            type="date"
            name="endDate"
            onChange={handleInputChange}
            value={inputs.endDate}
          />
        </Segment>
        <Button as={Link} to="addinvoice" color="teal" size="large">
          Add Invoice
        </Button>
      </Form>
    </Container>
  );
};

export default InvoiceList;
