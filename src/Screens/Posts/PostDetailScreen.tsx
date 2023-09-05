import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {IMainNavigatorPropTypes} from '../../Routes/MainNavigationTypes';
import SimpleButton from '../../Components/SimpleButton';
import {SafeAreaView} from 'react-native-safe-area-context';

const PostDetailScreen = (
  props: IMainNavigatorPropTypes<'PostDetailScreen'>,
) => {
  const {navigation, route} = props;
  const passedPost = route.params;

  const {height} = useWindowDimensions();

  const onBackHandler = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.Base}>
      <ScrollView bounces={false}>
        <View style={{height}}>
          <Image
            style={StyleSheet.absoluteFillObject}
            source={{uri: passedPost.image}}
          />
          <View style={[StyleSheet.absoluteFillObject, styles.Overlay]} />
          <Text style={styles.TitleText}>{passedPost.title}</Text>
        </View>
        <Text style={styles.BodyText}>{passedPost.body}</Text>
      </ScrollView>
      <SafeAreaView style={{position: 'absolute', top: 0, left: 0}}>
        <View style={{flexDirection: 'row'}}>
          <SimpleButton
            testID="back-button"
            label="back"
            onPress={onBackHandler}
            // style={styles.Button}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default PostDetailScreen;

const styles = StyleSheet.create({
  Base: {flex: 1},
  Overlay: {backgroundColor: 'black', opacity: 0.3},
  TitleText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 'auto',
    color: 'white',
    padding: 12,
    paddingBottom: 75,
  },
  BodyText: {
    fontSize: 18,
    fontWeight: '400',
    padding: 12,
    marginBottom: 100,
  },
  Button: {
    borderColor: 'black',
    color: 'black',
  },
});
