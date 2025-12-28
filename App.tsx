/**
 * Survival Guide - A React Native app with on-device LLM inference
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import TabNavigator from './src/navigation/TabNavigator';

function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <TabNavigator />
    </NavigationContainer>
  );
}

export default App;
