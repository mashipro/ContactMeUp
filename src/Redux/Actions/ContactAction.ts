import {ActionReducerMapBuilder, createAsyncThunk} from '@reduxjs/toolkit';
import {ActionPrefix} from '../../Utilities/GlobalValue';
import APICall from '../../Utilities/APIs/APIRequest';
import {IContactState} from '../Reducers/ContactReducer';
import {IContact} from '../../Types/GlobalTypes';

export const fetchContactList = createAsyncThunk(
  ActionPrefix.GET_CONTACT,
  async () => {
    const result = await APICall('getContact');
    // console.log('fetching contact list', result);

    return result;
  },
);

export const fetchContactByID = createAsyncThunk(
  ActionPrefix.GET_CONTACT_BY_ID,
  async (id: string) => {
    const result = await APICall('getContactByID', {id});
    console.log('fetchContactByID', result);

    return result;
  },
);

export const postContact = createAsyncThunk(
  ActionPrefix.CREATE_CONTACT,
  async (contact: IContact) => {
    const result = await APICall('postContact', undefined, contact);
    console.log('postContact', result);

    return result;
  },
);

type IEditContactPayload = {
  id: string;
  contact: IContact;
};
export const editContact = createAsyncThunk(
  ActionPrefix.EDIT_CONTACT,
  async (payload: IEditContactPayload, thunk) => {
    console.log('postContact payload', payload);
    const result = await APICall(
      'editContactByID',
      {id: payload.id},
      payload.contact,
    );
    console.log('postContact', result);
    thunk.dispatch(fetchContactByID(payload.id));

    return result;
  },
);

export const deleteContact = createAsyncThunk(
  ActionPrefix.DELETE_CONTACT,
  async (id: string) => {
    const result = APICall('deleteContactByID', {id});
    return result;
  },
);

const ContactActionReducerBuilder = (
  builder: ActionReducerMapBuilder<IContactState>,
) => {
  builder
    .addCase(fetchContactList.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(fetchContactList.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contactList = action.payload.data;
      state.error = {isError: false, message: action.payload.message};
    })
    .addCase(fetchContactList.rejected, (state, action: any) => {
      state.isLoading = false;
      state.error = {isError: true, message: action.payload.message};
    })
    .addCase(fetchContactByID.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(fetchContactByID.rejected, (state, action) => {
      state.isLoading = false;
    })
    .addCase(fetchContactByID.fulfilled, (state, action) => {
      state.isLoading = false;
      state.selectedContact = action.payload.data;
    })
    .addCase(postContact.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(postContact.rejected, (state, action) => {
      state.isLoading = false;
    })
    .addCase(postContact.fulfilled, (state, action) => {
      state.isLoading = false;
    })
    .addCase(deleteContact.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(deleteContact.rejected, (state, action) => {
      state.isLoading = false;
    })
    .addCase(deleteContact.fulfilled, (state, action) => {
      state.isLoading = false;
    });
};

export default ContactActionReducerBuilder;
