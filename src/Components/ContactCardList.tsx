import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {IContact} from '../Types/GlobalTypes';
import {isValidURL} from '../Utilities/StringUtilities';

type IContactCardListProp = {
  data: IContact;
  onPress: Function;
};

const ContactCardList: FC<IContactCardListProp> = prop => {
  const contact = prop.data;
  const isPhotoAvailable = isValidURL(contact.photo);

  return (
    <TouchableOpacity
      style={styles.BaseContainer}
      onPress={() => prop.onPress()}>
      {isPhotoAvailable && (
        <>
          <Image
            source={{uri: contact.photo!}}
            style={StyleSheet.absoluteFillObject}
          />
          <View
            style={[
              StyleSheet.absoluteFill,
              {backgroundColor: 'white', opacity: 0.8},
            ]}
          />
        </>
      )}
      <Text>{contact.firstName + ' ' + contact.lastName}</Text>
      {isPhotoAvailable ? (
        <Image source={{uri: contact.photo!}} style={styles.AvatarFrame} />
      ) : (
        <View style={styles.AvatarFrame}>
          <Text style={styles.Initial}>
            {contact.firstName[0] + contact.lastName[0]}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ContactCardList;

const DefaultSize: number = 50;

const styles = StyleSheet.create({
  BaseContainer: {
    backgroundColor: 'skyblue',
    padding: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  AvatarFrame: {
    height: DefaultSize,
    width: DefaultSize,
    backgroundColor: 'tomato',
    borderRadius: DefaultSize * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Initial: {
    textAlign: 'center',
    fontWeight: '900',
  },
});
