import {View, Text, StyleSheet, Image} from 'react-native';
import React, {FC, useState} from 'react';
import {IMainNavigatorPropTypes} from '../Routes/MainNavigationTypes';
import {SafeAreaView} from 'react-native-safe-area-context';
import SimpleButton from '../Components/SimpleButton';

const ContactDetailScreen: FC<
  IMainNavigatorPropTypes<'ContactDetailScreen'>
> = ({navigation, route}) => {
  const contact = route.params.contactDetail;

  const [deleteOps, setDeleteOps] = useState(false);

  const onBackPressHandler = () => {
    navigation.goBack();
  };
  const onEditPress = () => {
    if (deleteOps) return setDeleteOps(false);
    navigation.navigate('EditContactScreen');
  };
  const onDeletePress = () => {
    if (!deleteOps) return setDeleteOps(true);
    navigation.goBack();
    // setDeleteOps(true);
  };

  return (
    <SafeAreaView style={styles.SafeArea}>
      <Image
        source={{uri: contact.photo!}}
        style={[StyleSheet.absoluteFillObject]}
      />
      <View style={[StyleSheet.absoluteFillObject, styles.ImageOverlay]} />
      <View style={styles.Base}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <SimpleButton label="back" onPress={onBackPressHandler} />
          </View>
          <Text style={styles.HeroText}>
            <Text>{contact.firstName}</Text>
            {'\n'}
            <Text>{contact.lastName}</Text>
            {'\n'}
            <Text style={{fontSize: 30}}>
              {`Age: `}
              {contact.age}
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
