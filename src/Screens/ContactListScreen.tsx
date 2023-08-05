import {View, Text} from 'react-native';
import React, {FC} from 'react';
import {IMainNavigatorPropTypes} from '../Routes/MainNavigationTypes';

const ContactListScreen: FC<IMainNavigatorPropTypes<'ContactListScreen'>> = ({
  navigation,
}) => {
  return (
    <View>
      <Text>ContactListScreen</Text>
    </View>
  );
};

export default ContactListScreen;
