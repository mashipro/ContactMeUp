import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {FC, useEffect} from 'react';
import {IMainNavigatorPropTypes} from '../Routes/MainNavigationTypes';
import ContactCardList from '../Components/ContactCardList';
import {SafeAreaView} from 'react-native-safe-area-context';
import {IContact} from '../Types/GlobalTypes';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../Redux/Store';
import {fetchContactList} from '../Redux/Actions';
import SimpleButton from '../Components/SimpleButton';
import {useIsFocused} from '@react-navigation/native';
import {setSelectedContact} from '../Redux/Reducers/ContactReducer';

const ContactListScreen: FC<IMainNavigatorPropTypes<'ContactListScreen'>> = ({
  navigation,
}) => {
  const dispatch = useDispatch<any>();
  const contactLists = useSelector(
    (state: RootStateType) => state.contacts.contactList,
  );

  const focus = useIsFocused();

  useEffect(() => {
    if (!focus) return;
    dispatch(fetchContactList());
  }, [focus]);

  const onCardPress = (item: IContact) => {
    console.log('card pressed');
    dispatch(setSelectedContact(item));
    navigation.push('ContactDetailScreen', {contactDetail: item});
  };

  const onAddContactHandler = () => {
    navigation.navigate('EditContactScreen');
  };

  return (
    <SafeAreaView style={styles.SafeArea}>
      <View style={styles.Base}>
        <Text style={styles.Text}>My Contact</Text>
        <FlatList
          style={styles.FlatList}
          data={contactLists}
          keyExtractor={item => item.id!}
          renderItem={({item}) => (
            <ContactCardList data={item} onPress={() => onCardPress(item)} />
          )}
        />
      </View>
      <SimpleButton
        label="Add New Contact"
        onPress={onAddContactHandler}
        style={styles.Button}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SafeArea: {
    // backgroundColor: 'tomato',
    flex: 1,
    paddingHorizontal: 8,
  },
  Base: {
    // backgroundColor: 'skyblue',
    flex: 1,
  },
  FlatList: {flex: 1},
  Button: {
    borderColor: 'black',
    color: 'black',
  },
  Text: {
    fontSize: 36,
    fontWeight: '700',
  },
});

export default ContactListScreen;
