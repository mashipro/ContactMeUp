import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IContact, IPost} from '../Types/GlobalTypes';

export type IMainNavigator = {
  SplashScreen: undefined;
  ContactListScreen: undefined;
  ContactDetailScreen: {
    contactDetail: IContact;
  };
  EditContactScreen: undefined | {contactDetail: IContact};
  SceneSelectScreen: undefined;
  CounterScreen: undefined;
  PostsScreen: undefined;
  PostDetailScreen: IPost;
};

export type IMainNavigatorPropTypes<T extends keyof IMainNavigator> =
  NativeStackScreenProps<IMainNavigator, T>;
