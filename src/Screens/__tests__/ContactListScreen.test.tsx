import 'react-native';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ContactListScreen from '../ContactListScreen';
import {configureStore} from '@reduxjs/toolkit';
import Reducers from '../../Redux/Reducers';
import {Provider} from 'react-redux';
import {contactInitialState} from '../../Redux/Reducers/ContactReducer';
import {MockContactList} from '../../../jest/mockData';

jest.mock('@react-navigation/native', () => ({
  useIsFocused: jest.fn(),
}));

let navigation: any = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};
let route: any = {};

const user1 = MockContactList[0];
const user2 = MockContactList[3];

const addReducer = {
  contacts: {...contactInitialState, contactList: MockContactList},
};

const store = configureStore({reducer: Reducers, preloadedState: addReducer});

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
  jest.resetAllMocks();
});

describe('Contact List Screen Test Suite', () => {
  it('should render header', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <ContactListScreen navigation={navigation} route={route} />
      </Provider>,
    );
    const header = getByTestId('header-title');
    expect(header.props.children).toEqual('My Contact');
    expect(header.children[0]).toEqual('My Contact');
  });

  it('should render contact list', async () => {
    const {getAllByTestId} = render(
      <Provider store={store}>
        <ContactListScreen navigation={navigation} route={route} />
      </Provider>,
    );

    const list = getAllByTestId('contact-card');
    const name = getAllByTestId('contact-card-name');

    expect(list).toHaveLength(4);
    expect(name[0].children[0]).toEqual(`${user1.firstName} ${user1.lastName}`);
    expect(name[3].children[0]).toEqual(`${user2.firstName} ${user2.lastName}`);
  });

  it('click contact should go to details', () => {
    const {getAllByTestId} = render(
      <Provider store={store}>
        <ContactListScreen navigation={navigation} route={route} />
      </Provider>,
    );
    const list = getAllByTestId('contact-card');
    const card = list[0];

    fireEvent.press(card);
    expect(navigation.navigate).toBeCalledTimes(1);
    expect(navigation.navigate).toBeCalledWith('ContactDetailScreen', {
      contactDetail: user1,
    });
  });

  it('has button to create contact', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <ContactListScreen navigation={navigation} route={route} />
      </Provider>,
    );
    const button = getByTestId('footer-button');
    expect(button).not.toBeNull();
    fireEvent.press(button);
    expect(navigation.navigate).toBeCalledTimes(1);
    expect(navigation.navigate).toBeCalledWith('EditContactScreen');
  });
});
