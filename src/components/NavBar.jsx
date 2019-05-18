import React from 'react';
import { Container, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item as={Link} name="invoice" to="invoice">
            Home
          </Menu.Item>
          <Menu.Item as={Link} name="addinvoice" to="addinvoice" position="right">
            Create Invoice
          </Menu.Item>
          <Menu.Item as={Link} name="invoice" to="invoice">
            View Invoices
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  );
};

export default NavBar;
