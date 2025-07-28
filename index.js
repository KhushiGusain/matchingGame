import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { AppRegistry } from 'react-native';

import GameScreen from './src/screens/GameScreen';
import InitialScreen from './src/screens/InitialScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import SuccessScreen from './src/screens/SuccessScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Initial"
        screenOptions={{
          headerShown: false, // This removes all headers
        }}
      >
        <Stack.Screen name="Initial" component={InitialScreen} />
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="Success" component={SuccessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent('main', () => App);