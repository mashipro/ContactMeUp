import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {IContact, IErrorMessage} from '../../Types/GlobalTypes';
import ContactActionReducerBuilder from '../Actions/ContactAction';

export type IContactState = {
  isLoading: boolean;
  error: IErrorMessage | null;
  contactList: IContact[];
  selectedContact: IContact | null;
};

export const contactInitialState: IContactState = {
  isLoading: false,
  error: null,
  contactList: [],
  selectedContact: null,
};

const ContactReducer = createSlice({
  name: 'contacts',
  initialState: contactInitialState,
  reducers: {
    setSelectedContact: (
      state: IContactState,
      action: PayloadAction<IContact>,
    ) => {
      const selected = action.payload;
      state.selectedContact = selected;
    },
    clearSelectedContact: (state: IContactState) => {
      state.selectedContact = null;
    },
  },
  extraReducers: ContactActionReducerBuilder,
});

export const {setSelectedContact, clearSelectedContact} =
  ContactReducer.actions;
export default ContactReducer;
