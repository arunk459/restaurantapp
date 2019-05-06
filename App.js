/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import Home from './src/pages/Home';

const AppNavigator = createStackNavigator(
  {
  Login: Login,
  Register: Register,
  Home: Home
  },
  {
    initialRouteName: "Login"
  }
  
);

export default createAppContainer(AppNavigator);
// class App extends Component {
//   render() {
//     return (
//       <View>
//         <Text></Text>
//       </View>
//     );
//   }
// }


