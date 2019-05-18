import { SET_USER, ADD_INVOICE, EDIT_INVOICE, DELETE_INVOICE } from './../actions/types';

// Hard code some fake data
const fakeInvoices = [
  {
    id: 1,
    amount: 2999,
    text: 'a fake invoice',
    date: new Date('2011-04-11T10:20:30Z')
  },
  {
    id: 2,
    amount: 12999,
    text: 'a fake invoice',
    date: new Date('2011-04-10T10:20:30Z')
  },
  {
    id: 3,
    amount: 2995,
    text: 'a fake invoice',
    date: new Date('2011-04-11T10:20:30Z')
  },
  {
    id: 4,
    amount: 4099,
    text: 'a fake invoice',
    date: new Date('2011-04-12T10:20:30Z')
  },
  {
    id: 5,
    amount: 500,
    text: 'a fake invoice',
    date: new Date('2011-04-14T10:20:30Z')
  },
  {
    id: 6,
    amount: 700,
    text: 'a fake invoice',
    date: new Date('2011-04-17T10:20:30Z')
  },
  {
    id: 7,
    amount: 75,
    text: 'a fake invoice',
    date: new Date('2011-04-18T10:20:30Z')
  }
];

const initialState = {};

for (let i of fakeInvoices) {
  initialState[i.id] = i;
}

const invoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INVOICE: {
      const { invoice } = action;
      const id = invoice.id;
      return { ...state, id: invoice };
    }
    case EDIT_INVOICE: {
      const { invoice } = action;
      return { ...state, id: invoice };
    }
    case DELETE_INVOICE: {
      const { invoice } = action;
      return state.filter(e => e.id != invoice.id)
    }
    default:
      return state;
  }
};

export default invoiceReducer;
