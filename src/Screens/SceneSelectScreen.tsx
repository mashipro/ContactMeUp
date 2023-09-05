import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import SimpleButton from '../Components/SimpleButton';
import ImageUrlPool, {getRandomUrl} from '../Utilities/ImageUrlPool';
import {IMainNavigatorPropTypes} from '../Routes/MainNavigationTypes';

const SceneSelectScreen = (
  props: IMainNavigatorPropTypes<'SceneSelectScreen'>,
) => {
  const {navigation, route} = props;
  const goToContact = () => {
    navigation.navigate('ContactListScreen');
  };
  const goToCounter = () => {
    navigation.navigate('CounterScreen');
  };
  const goToPosts = () => {
    navigation.navigate('PostsScreen');
  };
  return (
    <View style={styles.Base}>
      <Image
        source={{uri: getRandomUrl()}}
        style={[StyleSheet.absoluteFillObject]}
      />
      <View style={[StyleSheet.absoluteFillObject, styles.ImageOverlay]} />
      <SafeAreaView style={styles.Base}>
        <Text testID="header-title" style={styles.Text}>
          Select Scenario
        </Text>
        <View style={styles.ButtonContainer}>
          <SimpleButton label="Contact List" onPress={goToContact} />
          <View style={styles.Separator} />
          <SimpleButton label="Number Counter" onPress={goToCounter} />
          <View style={styles.Separator} />
          <SimpleButton label="Posts" onPress={goToPosts} />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SceneSelectScreen;

const styles = StyleSheet.create({
  Base: {flex: 1, padding: 4},
  Text: {
    fontSize: 36,
    fontWeight: '700',
    color: 'white',
    marginBottom: 20,
  },
  ImageOverlay: {
    backgroundColor: 'black',
    opacity: 0.3,
  },
  ButtonContainer: {
    flex: 1,
    // backgroundColor: 'red',
  },
  Separator: {
    height: 12,
  },
});
