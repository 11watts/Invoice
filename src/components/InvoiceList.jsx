import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Button,
  Icon,
  Message,
  Menu,
  Table
} from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteInvoice } from '../actions/invoiceActions';

var timeOptions = {
  year: 'numeric',
  month: '2-digit',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
};

const toDollarFormat = n => `$${(n / 100).toFixed(2)}`;

const InvoiceList = props => {
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
            return (
              <Table.Row key={key}>
                <Table.Cell>{text}</Table.Cell>
                <Table.Cell>{toDollarFormat(amount)}</Table.Cell>
                <Table.Cell>
                  {date.toLocaleDateString('en', timeOptions)}
                </Table.Cell>
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
      <Button as={Link} to="addinvoice" color="teal" size="large">
        Add Invoice
      </Button>
    </Container>
  );
};

export default InvoiceList;
