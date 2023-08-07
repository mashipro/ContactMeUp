import {View, Text, StyleSheet, Image} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {IMainNavigatorPropTypes} from '../Routes/MainNavigationTypes';
import {SafeAreaView} from 'react-native-safe-area-context';
import SimpleButton from '../Components/SimpleButton';
import {useDispatch, useSelector} from 'react-redux';
import {deleteContact, fetchContactByID} from '../Redux/Actions';
import {RootStateType} from '../Redux/Store';
import {clearSelectedContact} from '../Redux/Reducers/ContactReducer';

const ContactDetailScreen: FC<
  IMainNavigatorPropTypes<'ContactDetailScreen'>
> = ({navigation, route}) => {
  const contact = route.params.contactDetail;

  const dispatch = useDispatch<any>();

  const [currentContact, setCurrentContact] = useState(contact);
  console.log('current detail', currentContact.firstName);

  const selectedContact = useSelector(
    (state: RootStateType) => state.contacts.selectedContact,
  );

  useEffect(() => {}, []);

  useEffect(() => {
    if (selectedContact === null) {
      dispatch(fetchContactByID(contact.id!));
    }
    setCurrentContact(selectedContact!);
  }, [selectedContact]);

  const [deleteOps, setDeleteOps] = useState(false);

  const onBackPressHandler = () => {
    navigation.goBack();
  };
  const onEditPress = () => {
    if (deleteOps) return setDeleteOps(false);
    navigation.navigate('EditContactScreen', {contactDetail: currentContact});
  };
  const onDeletePress = () => {
    if (!deleteOps) return setDeleteOps(true);
    dispatch(deleteContact(contact.id!)).then(() => {
      navigation.goBack();
      dispatch(clearSelectedContact());
    });
    // setDeleteOps(true);
  };

  return (
    <SafeAreaView style={styles.SafeArea}>
      <Image
        source={{uri: currentContact.photo!}}
        style={[StyleSheet.absoluteFillObject]}
      />
      <View style={[StyleSheet.absoluteFillObject, styles.ImageOverlay]} />
      <View style={styles.Base}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <SimpleButton label="back" onPress={onBackPressHandler} />
          </View>
          <Text style={styles.HeroText}>
            <Text>{currentContact.firstName}</Text>
            {'\n'}
            <Text>{currentContact.lastName}</Text>
            {'\n'}
            <Text style={{fontSize: 30}}>
              {'Age: '}
              {currentContact.age}
            </Text>
          </Text>
        </View>
        <View>
          {deleteOps && (
            <View style={styles.DeleteConfirmationContainer}>
              <Text>Are you sure?</Text>
            </View>
          )}
          <View style={styles.ButtonGroupContainer}>
            <View style={styles.ButtonWrapperContainer}>
              <SimpleButton
                label={deleteOps ? 'cancel' : 'edit'}
                onPress={onEditPress}
              />
            </View>
            <View style={styles.HorizontalSpace} />
            <View style={styles.ButtonWrapperContainer}>
              <SimpleButton
                label={deleteOps ? 'confirm' : 'delete'}
                onPress={onDeletePress}
                style={{color: 'tomato', borderColor: 'tomato'}}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SafeArea: {
    flex: 1,
  },
  Base: {
    flex: 1,
    padding: 8,
    justifyContent: 'space-between',
  },
  HeroText: {
    fontWeight: '900',
    fontSize: 60,
    color: 'white',
  },
  ImageOverlay: {
    backgroundColor: 'black',
    opacity: 0.3,
  },
  ButtonGroupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  HorizontalSpace: {
    width: 12,
  },
  DeleteConfirmationContainer: {
    backgroundColor: 'tomato',
    marginBottom: 12,
    padding: 8,
  },
  ButtonWrapperContainer: {
    flex: 1,
  },
});
export default ContactDetailScreen;
