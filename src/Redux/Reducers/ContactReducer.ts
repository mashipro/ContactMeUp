import {createSlice} from '@reduxjs/toolkit';
import {IContact, IErrorMessage} from '../../Types/GlobalTypes';

export type IContactState = {
  isLoading: false;
  error: IErrorMessage | null;
  contactList: IContact[];
};

export const contactInitialState: IContactState = {
  isLoading: false,
  error: null,
  contactList: [],
};

const ContactReducer = createSlice({
  name: 'contacts',
  initialState: contactInitialState,
  reducers: {},
});

// export const {}
export default ContactReducer;
