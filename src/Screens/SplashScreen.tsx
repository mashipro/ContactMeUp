import {Text, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import {IMainNavigatorPropTypes} from '../Routes/MainNavigationTypes';

const SplashScreen: FC<IMainNavigatorPropTypes<'SplashScreen'>> = ({
  navigation,
}) => {
  useEffect(() => {
    setTimeout(() => {
      // console.log('timeout');
      navigation.replace('SceneSelectScreen');
    }, 1000);
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text testID="Titles" style={{fontSize: 80, fontWeight: 'bold'}}>
        Contact Me App
      </Text>
    </View>
  );
};

export default SplashScreen;
