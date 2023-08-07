import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useState} from 'react';
import SimpleButton from '../Components/SimpleButton';
import {IMainNavigatorPropTypes} from '../Routes/MainNavigationTypes';
import SimpleTextInput from '../Components/SimpleTextInput';
import SimpleImagePicker from '../Components/SimpleImagePicker';
import {IContact} from '../Types/GlobalTypes';
import {useDispatch, useSelector} from 'react-redux';
import {editContact, postContact} from '../Redux/Actions';
import {RootStateType} from '../Redux/Store';

const EditContactScreen: FC<IMainNavigatorPropTypes<'EditContactScreen'>> = ({
  navigation,
  route,
}) => {
  const contactDetail = route.params?.contactDetail;
  const isCreate = route.params?.contactDetail === undefined;
  console.log('is create contact form', isCreate);

  const dispatch = useDispatch<any>();
  const contactState = useSelector((state: RootStateType) => state.contacts);

  const [firstName, setFirstName] = useState(contactDetail?.firstName || '');
  const [lastName, setLastName] = useState(contactDetail?.lastName || '');
  const [age, setAge] = useState(contactDetail?.age || 0);
  const [photo, setPhoto] = useState(contactDetail?.photo || '');
  const [confirm, setConfirm] = useState(false);

  const onBackPressHandler = () => {
    if (confirm) return setConfirm(false);
    navigation.goBack();
  };

  const onSubmitPressHandler = () => {
    if (!confirm) return setConfirm(true);
    if (contactState.isLoading) return;

    const newContact: IContact = {
      firstName,
      lastName,
      age,
      photo,
      // id: contactDetail?.id,
    };
    console.log('New Contact Form', newContact);
    if (isCreate) {
      dispatch(postContact(newContact)).then(() => {
        // await dispatch(fetchContactList());
        navigation.goBack();
      });
    } else {
      dispatch(editContact({id: contactDetail?.id!, contact: newContact})).then(
        () => {
          navigation.goBack();
        },
      );
    }
  };

  return (
    <View style={styles.Base}>
      <View style={{flex: 1}}>
        <Text style={styles.Text}>
          {isCreate ? 'Create Contact' : 'Edit Contact'}
        </Text>
        <SimpleTextInput
          label="First Name"
          value={firstName}
          onTextChange={t => setFirstName(t)}
        />
        <SimpleTextInput
          label="Last Name"
          value={lastName}
          onTextChange={t => setLastName(t)}
        />
        <SimpleTextInput
          label="Age"
          value={age.toString()}
          onTextChange={t => setAge(parseInt(t, 10))}
        />
        <SimpleTextInput
          label="Photo URL"
          value={photo}
          onTextChange={t => setPhoto(t)}
        />
        <SimpleImagePicker onImageSelected={image => setPhoto(image)} />
      </View>

      <View>
        {confirm && (
          <Text
            style={{
              backgroundColor: 'springgreen',
              padding: 8,
              // color: 'white',
            }}>
            Are you sure?
          </Text>
        )}
        <View style={{flexDirection: 'row', marginTop: 8}}>
          <View style={{flex: 1}}>
            <SimpleButton
              label={confirm ? 'cancel' : 'back'}
              onPress={onBackPressHandler}
              style={{borderWidth: 0, color: 'black'}}
            />
          </View>
          <View style={{flex: 1}}>
            <SimpleButton
              label={confirm ? 'confirm' : isCreate ? 'create' : 'submit'}
              onPress={onSubmitPressHandler}
              style={{
                borderColor: confirm ? 'springgreen' : 'black',
                color: confirm ? 'springgreen' : 'black',
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default EditContactScreen;

const styles = StyleSheet.create({
  Base: {
    flex: 1,
    // backgroundColor: 'skyblue',
    padding: 8,
    justifyContent: 'space-between',
  },
  Text: {
    fontSize: 36,
    fontWeight: '700',
  },
});
