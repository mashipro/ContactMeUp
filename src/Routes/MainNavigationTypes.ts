import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type IMainNavigator = {
  SplashScreen: undefined;
  ContactListScreen: undefined;
};

export type IMainNavigatorPropTypes<T extends keyof IMainNavigator> =
  NativeStackScreenProps<IMainNavigator, T>;
