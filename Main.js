// In App.js in a new project

import * as React from 'react';
import { View, Text,LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screen/HomeScreen';
import FinalFood from './screen/FinalFood';

const Stack = createNativeStackNavigator();
LogBox.ignoreAllLogs()
function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}} >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="FinalFood" component={FinalFood} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Main;