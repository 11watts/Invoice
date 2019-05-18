import { combineReducers } from "redux";
import userReducer from "./userReducer";
import invoiceReducer from './invoiceReducer';

export default combineReducers({
  invoiceReducer,
  userReducer
});
