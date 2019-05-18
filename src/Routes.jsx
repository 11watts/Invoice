import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import NavBar from './components/NavBar';
import InvoiceList from './components/InvoiceList';
import InvoiceForm from './components/InvoiceForm';

const Routes = () => (
  <>
    <NavBar />
    <Switch>
      <Route path="/signup" component={SignUpForm} />
      <Route path="/login" component={LoginForm} />
      <Route path="/invoice" component={InvoiceList} />
      <Route path="/addinvoice" component={InvoiceForm} />
      <Route path="/" component={App} />
    </Switch>
  </>
);

export default Routes;
