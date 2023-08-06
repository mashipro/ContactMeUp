import {View, Text, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {IMainNavigatorPropTypes} from '../Routes/MainNavigationTypes';
import ContactCardList from '../Components/ContactCardList';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IContact} from '../Types/GlobalTypes';
import {useSelector} from 'react-redux';
import {RootStateType} from '../Redux/Store';

const DummyContact: IContact = {
  id: 'b3abd640-c92b-11e8-b02f-cbfa15db428b',
  firstName: 'Luke',
  lastName: 'Skywalker',
  age: 20,
  photo:
    'https://images.unsplash.com/photo-1624467906831-1f80d34ed5ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80',
};

const ContactListScreen: FC<IMainNavigatorPropTypes<'ContactListScreen'>> = ({
  navigation,
}) => {
  const onCardPress = () => {
    console.log('card pressed');
    navigation.push('ContactDetailScreen', {contactDetail: DummyContact});
  };

  const contacts = useSelector((state: RootStateType) => state.contacts);
  console.log('contacts', contacts);

  return (
    <SafeAreaView style={styles.SafeArea} edges={['top']}>
      <View style={styles.Base}>
        <Text>ContactListScreen</Text>
        <ContactCardList data={DummyContact} onPress={onCardPress} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SafeArea: {
    // backgroundColor: 'tomato',
    flex: 1,
  },
  Base: {
    // backgroundColor: 'skyblue',
    flex: 1,
  },
});

export default ContactListScreen;
