import React from 'react';

// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {IMainNavigator} from './MainNavigationTypes';
import SplashScreen from '../Screens/SplashScreen';
import ContactListScreen from '../Screens/ContactListScreen';

const Stack = createNativeStackNavigator<IMainNavigator>();

export default function MainNavigationRoutes() {
  const DefaultScreenOptions = {headerShown: false};

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={DefaultScreenOptions}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen
            name="ContactListScreen"
            component={ContactListScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
