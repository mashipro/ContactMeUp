import {combineReducers} from 'redux';
import ContactReducer from './ContactReducer';

export default combineReducers({
  contacts: ContactReducer.reducer,
});
