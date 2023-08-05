import {View, Text, StyleSheet, Image} from 'react-native';
import React, {FC} from 'react';
import {IMainNavigatorPropTypes} from '../Routes/MainNavigationTypes';
import {SafeAreaView} from 'react-native-safe-area-context';

const ContactDetailScreen: FC<
  IMainNavigatorPropTypes<'ContactDetailScreen'>
> = ({navigation, route}) => {
  const contact = route.params.contactDetail;

  return (
    <SafeAreaView style={styles.SafeArea}>
      <Image
        source={{uri: contact.photo!}}
        style={[StyleSheet.absoluteFillObject]}
      />
      <View style={[StyleSheet.absoluteFillObject, styles.ImageOverlay]} />
      <View style={styles.Base}>
        <Text style={styles.HeroText}>
          <Text>{contact.firstName}</Text>
          {'\n'}
          <Text>{contact.lastName}</Text>
        </Text>
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
    padding: 8,
  },
  HeroText: {
    fontWeight: '900',
    fontSize: 60,
  },
  ImageOverlay: {
    backgroundColor: 'black',
    opacity: 0.3,
  },
});
export default ContactDetailScreen;
