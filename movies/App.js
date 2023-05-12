import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import { NavigationContainer } from '@react-navigation/native'
import StackNavigator from './src/navigation/StackNavigator';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
    </Provider>
  );
}