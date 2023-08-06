import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IContact} from '../Types/GlobalTypes';

export type IMainNavigator = {
  SplashScreen: undefined;
  ContactListScreen: undefined;
  ContactDetailScreen: {
    contactDetail: IContact;
  };
  EditContactScreen: undefined | {contactDetail: IContact};
};

export type IMainNavigatorPropTypes<T extends keyof IMainNavigator> =
  NativeStackScreenProps<IMainNavigator, T>;
