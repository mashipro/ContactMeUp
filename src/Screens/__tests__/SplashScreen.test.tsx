import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';
import SplashScreen from '../SplashScreen';

let navigation: any = {
  replace: jest.fn(),
};
let route: any = {};

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

const screen = render(<SplashScreen navigation={navigation} route={route} />);

describe('Splash Screen Test Suite', () => {
  it('should render text', () => {
    const component = screen.getByTestId('Titles');
    expect(component.props.children).toEqual('Contact Me App');
  });

  it('should trigger navigation', async () => {
    render(<SplashScreen navigation={navigation} route={route} />);
    jest.runAllTimers();
    expect(navigation.replace).toBeCalledWith('ContactListScreen');
    expect(navigation.replace).toBeCalledTimes(1);
  });
});
