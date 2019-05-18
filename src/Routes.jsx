import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './index.css';
import NavBar from './components/NavBar';
import InvoiceList from './components/InvoiceList';
import InvoiceForm from './components/InvoiceForm';
import EditInvoiceForm from './components/EditInvoiceForm';

const Routes = () => (
  <>
    <NavBar />
    <Switch>
      <Route path="/invoice" component={InvoiceList} />
      <Route path="/addinvoice" component={InvoiceForm} />
      <Route path="/editinvoice" component={EditInvoiceForm} />
      <Route path="/" component={InvoiceList} />
    </Switch>
  </>
);

export default Routes;
