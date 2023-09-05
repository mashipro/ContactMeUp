import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {IMainNavigator} from './MainNavigationTypes';
import SplashScreen from '../Screens/SplashScreen';
import ContactListScreen from '../Screens/ContactListScreen';
import ContactDetailScreen from '../Screens/ContactDetailScreen';
import EditContactScreen from '../Screens/EditContactScreen';
import CounterScreen from '../Screens/Posts/CounterScreen';
import PostDetailScreen from '../Screens/Posts/PostDetailScreen';
import PostsScreen from '../Screens/Posts/PostsScreen';
import SceneSelectScreen from '../Screens/SceneSelectScreen';

const Stack = createNativeStackNavigator<IMainNavigator>();

export default function MainNavigationRoutes() {
  const DefaultScreenOptions = {headerShown: false};

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={DefaultScreenOptions}>
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SceneSelectScreen"
            component={SceneSelectScreen}
          />
          <Stack.Group>
            <Stack.Screen
              name="ContactListScreen"
              component={ContactListScreen}
            />
            <Stack.Screen
              name="ContactDetailScreen"
              component={ContactDetailScreen}
            />
            <Stack.Group screenOptions={{presentation: 'modal'}}>
              <Stack.Screen
                name="EditContactScreen"
                component={EditContactScreen}
              />
            </Stack.Group>
          </Stack.Group>
          <Stack.Group>
            <Stack.Screen name="CounterScreen" component={CounterScreen} />
            <Stack.Screen name="PostsScreen" component={PostsScreen} />
            <Stack.Screen
              name="PostDetailScreen"
              component={PostDetailScreen}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
