import { ADD_INVOICE, EDIT_INVOICE, DELETE_INVOICE } from "./types";

export const addInvoice = (invoice) => ({
    invoice,
    type: ADD_INVOICE
});

export const editInvoice = (invoice) => ({
    invoice,
    type: EDIT_INVOICE
});

export const deleteInvoice = (id) => ({
    id,
    type: DELETE_INVOICE
});