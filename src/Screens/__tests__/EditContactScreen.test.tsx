import 'react-native';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {configureStore} from '@reduxjs/toolkit';
import Reducers from '../../Redux/Reducers';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {contactInitialState} from '../../Redux/Reducers/ContactReducer';
import {MockContactList} from '../../../jest/mockData';
import EditContactScreen from '../EditContactScreen';
import ImageUrlPool from '../../Utilities/ImageUrlPool';

let navigation: any = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

const user1 = MockContactList[0];
const user2 = MockContactList[3];

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

describe('Edit Contact Screen - New Contact - Test Suite', () => {
  let route: any = {
    params: {contactDetail: undefined},
  };

  it('Should go back on back press', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <EditContactScreen navigation={navigation} route={route} />
      </Provider>,
    );
    const backButton = getByTestId('button-back');
    expect(backButton).toBeTruthy();

    fireEvent.press(backButton);
    expect(navigation.goBack).toBeCalledTimes(1);
  });

  it('All box should empty', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <EditContactScreen navigation={navigation} route={route} />
      </Provider>,
    );

    const inputNameFirst = getByTestId('input-name-first');
    const inputNameLast = getByTestId('input-name-last');
    const inputAge = getByTestId('input-age');
    const inputPhoto = getByTestId('input-photo');

    expect(inputNameFirst.props.value).toBe('');
    expect(inputNameLast.props.value).toBe('');
    expect(inputAge.props.value).toBe('0');
    expect(inputPhoto.props.value).toBe('');
  });

  it('can choose image', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <EditContactScreen navigation={navigation} route={route} />
      </Provider>,
    );

    const inputPhoto = getByTestId('input-photo');
    const picker = getByTestId('image-picker');
    expect(picker).toBeTruthy();
    const pickerItem = getByTestId('image-picker-image-1');
    expect(pickerItem).toBeTruthy();
    fireEvent.press(pickerItem);
    expect(inputPhoto.props.value).toBe(ImageUrlPool[1]);
  });

  it('fill all user field', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <EditContactScreen navigation={navigation} route={route} />
      </Provider>,
    );

    const inputNameFirst = getByTestId('input-name-first');
    const inputNameLast = getByTestId('input-name-last');
    const inputAge = getByTestId('input-age');
    const inputPhoto = getByTestId('input-photo');
    const pickerItem = getByTestId('image-picker-image-1');
    const buttonRight = getByTestId('button-right');
    const buttonRightText = getByTestId('button-right-text');

    fireEvent.changeText(inputNameFirst, user1.firstName);
    fireEvent.changeText(inputNameLast, user1.lastName);
    fireEvent.changeText(inputAge, user1.age);
    fireEvent.press(pickerItem);

    expect(inputNameFirst.props.value).toBe(user1.firstName);
    expect(inputNameLast.props.value).toBe(user1.lastName);
    expect(inputAge.props.value).toBe(`${user1.age}`);
    expect(inputPhoto.props.value).toBe(ImageUrlPool[1]);

    fireEvent.press(buttonRight);
    expect(buttonRightText.children[0]).toBe('confirm');

    fireEvent.press(buttonRight);
    expect(mockDispatch).toBeCalledTimes(1);
  });
});
