import 'react-native';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {configureStore} from '@reduxjs/toolkit';
import Reducers from '../../Redux/Reducers';
import {Provider} from 'react-redux';
import {contactInitialState} from '../../Redux/Reducers/ContactReducer';
import {MockContactList} from '../../../jest/mockData';
import ContactDetailScreen from '../ContactDetailScreen';

let navigation: any = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

const user1 = MockContactList[0];
const user2 = MockContactList[3];

let route: any = {
  params: {contactDetail: user1},
};

const addReducer = {
  contacts: {
    ...contactInitialState,
    contactList: MockContactList,
    selectedContact: user1,
  },
};

const store = configureStore({reducer: Reducers, preloadedState: addReducer});

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch.mockImplementation(() => Promise.resolve()),
}));

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
  jest.resetAllMocks();
});

describe('Contact Details Screen Test Suite', () => {
  it('Should render all elements', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <ContactDetailScreen navigation={navigation} route={route} />
      </Provider>,
    );

    const firstName = getByTestId('user-name-first');
    expect(firstName).toBeTruthy();
    expect(firstName.children[0]).toEqual(user1.firstName);

    const lastName = getByTestId('user-name-last');
    expect(lastName).toBeTruthy();
    expect(lastName.children[0]).toEqual(user1.lastName);

    const age = getByTestId('user-age');
    expect(age).toBeTruthy();
    expect(age.children[0]).toEqual(`Age: ${user1.age}`);
  });

  it('Should go back on back press', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <ContactDetailScreen navigation={navigation} route={route} />
      </Provider>,
    );
    const backButton = getByTestId('button-back');
    expect(backButton).toBeTruthy();

    fireEvent.press(backButton);
    expect(navigation.goBack).toBeCalledTimes(1);
  });

  it('Should go to edit contact page', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <ContactDetailScreen navigation={navigation} route={route} />
      </Provider>,
    );
    const editButton = getByTestId('button-left');
    expect(editButton).toBeTruthy();

    fireEvent.press(editButton);
    expect(navigation.navigate).toBeCalledTimes(1);
    expect(navigation.navigate).toBeCalledWith('EditContactScreen', {
      contactDetail: user1,
    });
  });

  it('Should delete contact', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <ContactDetailScreen navigation={navigation} route={route} />
      </Provider>,
    );

    const deleteButton = getByTestId('button-right');
    const deleteButtonText = getByTestId('button-right-text');
    expect(deleteButton).toBeTruthy();
    expect(deleteButtonText.children[0]).toContain('delete');
    fireEvent.press(deleteButton);
    expect(deleteButtonText.children[0]).toContain('confirm');
    fireEvent.press(deleteButton);
    expect(mockDispatch).toBeCalledTimes(1);
  });
});
