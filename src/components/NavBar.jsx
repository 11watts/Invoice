import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Container, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const mapState = useCallback(state => ({
    user: state.userReducer.user
  }));

  const { user } = useSelector(mapState);

  return (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item as={Link} name="home" to="home">
            Home
          </Menu.Item>
          <Menu.Item as={Link} name="addinvoice" to="addinvoice" position="right">
            Create Invoice
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  );
};

export default NavBar;
