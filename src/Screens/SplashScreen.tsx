import {Text, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import {IMainNavigatorPropTypes} from '../Routes/MainNavigationTypes';

const SplashScreen: FC<IMainNavigatorPropTypes<'SplashScreen'>> = ({
  navigation,
}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('ContactListScreen');
    }, 1000);
    return () => {};
  }, [navigation]);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 100, fontWeight: 'bold'}}>SplashScreen</Text>
    </View>
  );
};

export default SplashScreen;
